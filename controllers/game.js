'use strict'

const Router = require('koa-router')

const koaBody = require('koa-body')()

const game = new Router({prefix: '/game'})

game.get('/', async ctx => {
	const reviews = await ctx.db.getReviews()
	let i
	const approved = []
	for (i = 0; i < reviews.length; i++) {
		if(reviews[i]['approved'] === 'yes') {
			approved.push(reviews[i])
		} else {
			continue
		}
	}
	await ctx.render('GameReviewTestTLOU', {review: approved})
})

game.post('/', koaBody, async ctx => {
	try {
		const body = ctx.request.body
		await ctx.db.createReview(body)
		ctx.redirect('/game')
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})

module.exports = game
