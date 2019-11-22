'use strict'

const Router = require('koa-router')
const game = new Router()
const Review = require('../models/review')

game.get('/game:id', async ctx => {
	try {
		const gamedata = await ctx.db.getGame(Number(ctx.params.id))
		const reviews = (await ctx.db.getReviewsForGame(Number(gamedata.gameID))).reverse();
		const reviewCount = reviews.length;
		const platformsIds = gamedata.platforms.split(',');
		const platforms = await ctx.db.getPlatforms(platformsIds);
		await ctx.render('game', {review: reviews.slice(0,3),  expandedReview: reviews, thisgame: gamedata, reviewNo: reviewCount, platforms: platforms})
	} catch(err) {
		ctx.body = err.message
	}
})

game.get('/allReviews:id', async ctx => {
	try {
		const gamedata = await ctx.db.getGame(Number(ctx.params.id))
		const reviews = (await ctx.db.getReviewsForGame(Number(gamedata.gameID))).reverse();
		const reviewCount = reviews.length+1;
		await ctx.render('allReviews', {review: reviews, thisgame: gamedata, reviewNo: reviewCount})
	} catch(err) {
		ctx.body = err.message
	}
})

game.post('/add', async ctx => {
	try {
		const body = ctx.request.body
		console.log(body.gameName);
		var reviewText = body.rvtext;
		const review = new Review(ctx.session.userID, body.gameID, body.starRating, reviewText, "DD/MM/YYYY", "no");
		console.log(review);
		await ctx.db.createReview(review);
		ctx.redirect(`/game${body.gameID}`)
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})

game.post('/showAllReviews', async ctx => {
	try {
		const body = ctx.request.body
		ctx.redirect(`/allReviews${body.gameID}`)
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})
game.post('/game:id', async ctx => {
	try {
		ctx.redirect(`/game${ctx.params.id}`)
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})

module.exports = game

