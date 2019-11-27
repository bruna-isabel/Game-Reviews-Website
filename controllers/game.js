'use strict'

const Router = require('koa-router')
const game = new Router()
const Review = require('../models/review')

// eslint-disable-next-line max-lines-per-function
game.get('/game:id', async ctx => {
	try {
		const gamedata = await ctx.db.getGame(Number(ctx.params.id))
		const reviews = (await ctx.db.getReviewsForGame(Number(gamedata.gameID))).reverse();
		const reviewCount = reviews.length;
		const platformsIds = gamedata.platforms.split(',');
		const platforms = await ctx.db.getPlatforms(platformsIds);
		const user = await ctx.db.getUser(ctx.session.userID)
		let avgScore = 0;
		if (reviewCount > 0) {
			avgScore = await ctx.db.getAvgScore(gamedata.gameID);
		}
		else {
			avgScore = 0;
		}
		if (gamedata.approved === 'yes' || user.isAdmin === 'yes') { //so the game page can be opened by an admin during the approval process
			await ctx.render('game', {review: reviews.slice(0,3),  expandedReview: reviews, thisgame: gamedata, reviewNo: reviewCount, platforms: platforms, avgScore: avgScore, user: ctx.session.authorised, admin: await ctx.db.isUserAdmin(ctx.session.userID)})
		}
		else {
			ctx.redirect(`/list`)
		}
	} catch(err) {
		ctx.body = err.message
	}
})

game.get('/allReviews:id', async ctx => {
	try {
		const gamedata = await ctx.db.getGame(Number(ctx.params.id))
		const reviews = (await ctx.db.getReviewsForGame(Number(gamedata.gameID))).reverse();
		const reviewCount = reviews.length;
		let avgScore = 0;
		if (reviewCount > 0)
		{
			avgScore = await ctx.db.getAvgScore(gamedata.gameID);
		}
		else
		{
			avgScore = 0;
		}
		await ctx.render('allReviews', {review: reviews, thisgame: gamedata, reviewNo: reviewCount, avgScore: avgScore, user: ctx.session.authorised, admin: await ctx.db.isUserAdmin(ctx.session.userID)})
	} catch(err) {
		ctx.body = err.message
	}
})

game.post('/add', async ctx => {
	try {
		const body = ctx.request.body
		let reviewText = body.rvtext;
		const user = await ctx.db.getUser(ctx.session.userID)
		const review = new Review(user.username, body.gameID, body.starRating, reviewText, "DD/MM/YYYY", "no");
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

