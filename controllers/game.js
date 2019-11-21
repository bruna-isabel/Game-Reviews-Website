'use strict'

const Router = require('koa-router')
const Review = require('../models/review')
const game = new Router()

game.get('/game:id', async ctx => {
	try {
		const gamedata = await ctx.db.getGame(Number(ctx.params.id))
		const reviews = await ctx.db.getReviews();
		console.log(gamedata)
		await ctx.render('GameReviewTestTLOU', {review: reviews,  thisgame: gamedata})
	} catch(err) {
		ctx.body = err.message
	}
})

game.post('/add', async ctx => {
	try {
		console.log("HELLO");
		const body = ctx.request.body
		console.log(body.gameName);
		const review = new Review(ctx.session.userID, body.gameName, body.starRating, body.rvtext, "DD/MM/YYYY", "no");
		console.log(review);
		await ctx.db.createReview(review);
		ctx.redirect(`/game`)
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})

module.exports = game

