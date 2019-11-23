'use strict'

const Router = require('koa-router')

const approval = new Router({prefix: '/approval'})

approval.get('/games', async ctx => {
	try {
		//console.log(await ctx.session.authorised)
		//If user is not logged in
		if(await ctx.session.authorised !== true) {
			return await ctx.render('error', {message: 'Session not authorised'})
		}
		//console.log(await ctx.db.isUserAdmin(await ctx.session.userID))
		//If user is logged in, but isn't an admin
		if(await ctx.db.isUserAdmin(await ctx.session.userID) !== true) {
			return await ctx.render('error', {message: 'Session not authorised'})
		}

		const unapproved = await ctx.db.approvalGameList(false)
		await ctx.render('approvalGames', {games: unapproved})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

approval.post('/games', async ctx => {
	try {
		const body = ctx.request.body
		//console.log(body)
		const id = parseInt(Object.keys(body)[0]) //getting the key (gameID) and converting it into an integer
		const game = await ctx.db.getGame(id)
		if(body[id] === 'Approve') {
			game.approved = 'yes'
			await ctx.db.updateGame(game)
		} else if(body[id] === 'Reject') {
			await ctx.db.deleteGame(id)
		}
		ctx.redirect('/approval/games')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

approval.get('/reviews', async ctx => {
	try {
		//If user is not logged in
		if(await ctx.session.authorised !== true) {
			return await ctx.render('error', {message: 'Session not authorised'})
		}
		//If user is logged in, but isn't an admin
		if(await ctx.db.isUserAdmin(await ctx.session.userID) !== true) {
			return await ctx.render('error', {message: 'Session not authorised'})
		}
		const unapproved = await ctx.db.approvalReviewList(false)
		await ctx.render('approvalReviews', {review: unapproved})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

approval.post('/reviews', async ctx => {
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
