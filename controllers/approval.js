'use strict'

const Router = require('koa-router')

const approval = new Router({prefix: '/approval'})

const {authenticateUser} = require('./middleware/auth')

// eslint-disable-next-line max-lines-per-function
approval.get('/games', authenticateUser, async ctx => {
	try {
		if(await ctx.db.isUserAdmin(ctx.session.userID) !== true) {
			return await ctx.render('error', {message: 'Session not authorised'})
		}

		const unapproved = await ctx.db.approvalGameList(false)

		//changing submittedBy from an ID to the username
		let game
		for(game of unapproved) {
			//console.log(game.submittedBy)
			const user = await ctx.db.getUser(game.submittedBy)
			game.submittedBy = user.username
			if(game.poster.startsWith('http')) {
				game.url = true
			}
		}

		await ctx.render('approvalGames', {games: unapproved, user: ctx.session.authorised,
			admin: await ctx.db.isUserAdmin(ctx.session.userID)})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

approval.post('/games', authenticateUser, async ctx => {
	try {
		console.log(ctx.request.body)
		const { id, action } = ctx.request.body
		const game = await ctx.db.getGame(Number(id))

		if(action === 'Approve') {
			game.approved = 'yes'
			await ctx.db.updateGame(game)
		} else if(action === 'Reject') {
			await ctx.db.deleteGame(game.id)
		}

		ctx.redirect('/approval/games')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

approval.get('/reviews', authenticateUser, async ctx => {
	try {
		//If user is not logged in
		//if(await ctx.session.authorised !== true) {
		//	return await ctx.render('error', {message: 'Session not authorised'})
		//}
		//If user is logged in, but isn't an admin
		if(await ctx.db.isUserAdmin(await ctx.session.userID) !== true) {
			return await ctx.render('error', {message: 'Session not authorised'})
		}
		const unapproved = await ctx.db.approvalReviewList(false)
		await ctx.render('approvalReviews', {review: unapproved, user: ctx.session.authorised,
			admin: await ctx.db.isUserAdmin(ctx.session.userID)})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

approval.post('/reviews', authenticateUser, async ctx => {
	try {
		const body = ctx.request.body
		const id = parseInt(Object.keys(body)[0])
		const review = await ctx.db.getReview(id)
		//console.log(review)
		if(body[id] === 'Approve') {
			review.approved = 'yes'
			await ctx.db.updateReview(review)
		} else if(body[id] === 'Reject') {
			await ctx.db.deleteReview(id)
		}
		await ctx.redirect('/approval/reviews')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

module.exports = approval
