'use strict'

const Router = require('koa-router')

const koaBody = require('koa-body')()

const approval = new Router({prefix: '/approval'})

approval.get('/games', async ctx => {
	//maybe check if user is an admin
	try {
		const games = await ctx.db.getGames()
		let i
		const unapproved = []
		for (i = 0; i < games.length; i++) {
			if(games[i]['approved'] !== 'yes') {
				unapproved.push(games[i])
			} else {
				continue
			}
		}
		await ctx.render('approvalGames.hbs', {games: unapproved})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

approval.post('/games', koaBody, async ctx => {
	try {
		const body = ctx.request.body
		const id = parseInt(Object.keys(body)[0]) //getting the key (gameID) and converting it into an integer
		const game = await ctx.db.getGame(id)
		if(body[id] === 'Approve') {
			game['approved'] = 'yes'
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
		const reviews = await ctx.db.getReviews()
		let i
		const unapproved = []
		for (i = 0; i < reviews.length; i++) {
			if(reviews[i]['approved'] !== 'yes') {
				unapproved.push(reviews[i])
			} else {
				continue
			}
		}
		await ctx.render('approvalReviews', {review: unapproved})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

approval.post('/reviews', koaBody, async ctx => {
	try {
		const body = ctx.request.body
		const id = parseInt(Object.keys(body)[0])
		const review = await ctx.db.getReview(id)
		console.log(review)
		if(body[id] === 'Approve') {
			review['approved'] = 'yes'
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
