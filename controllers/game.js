/* eslint-disable max-statements */
/* eslint-disable complexity */
'use strict'

const Router = require('koa-router')
const game = new Router()
const Review = require('../models/review')
const Comment = require('../models/comment')

// eslint-disable-next-line max-lines-per-function
game.get('/game:id', async ctx => {
	try {
		//const gameID = Number(ctx.params.id //commented out because of eslint error (too many statements)
		if (isNaN(Number(ctx.params.id))) {
			throw new Error('game ID must be a number')
		}
		const gamedata = await ctx.db.getGame(Number(ctx.params.id))
		const reviews = (await ctx.db.getReviewsForGame(Number(gamedata.gameID))).reverse()
		const reviewCount = reviews.length
		const platforms = gamedata.platforms
		const user = await ctx.db.getUser(ctx.session.userID)
		const hasReviews = reviewCount>0
		let avgScore = 0
		if (reviewCount > 0) {
			avgScore = await ctx.db.getAvgScore(gamedata.gameID)
		} else {
			avgScore = 0
		}
		if(gamedata.poster.startsWith('http')) {
			gamedata.url = true
		}
		if (gamedata.approved === 'yes' || user.isAdmin === 'yes') {
		//so the game page can be opened by an admin during the approval process
			const sliceInt = 3
			await ctx.render('game', {review: reviews.slice(0, sliceInt), expandedReview: reviews, thisgame: gamedata,
				reviewNo: reviewCount, platforms: platforms, avgScore: avgScore, user: ctx.session.authorised,
				admin: await ctx.db.isUserAdmin(ctx.session.userID), hasReviews: hasReviews})
		} else {
			ctx.redirect('/list')
		}
	} catch(err) {
		ctx.body = err.message
	}
})

// eslint-disable-next-line max-lines-per-function
game.get('/allReviews:id', async ctx => {
	try {
		const gamedata = await ctx.db.getGame(Number(ctx.params.id))
		const reviews = (await ctx.db.getReviewsForGame(Number(gamedata.gameID))).reverse()
		const reviewCount = reviews.length
		//const comments = (await ctx.db.getCommentsForReview(Number(reviews[0])));
		let avgScore = 0
		const comments = []
		for (let i = 0; i < reviewCount; i++) {
			comments.push(await ctx.db.getCommentsForReview(i))
			console.log(comments[i])
		}
		if(gamedata.poster.startsWith('http')) {
			gamedata.url = true
		}
		if (reviewCount > 0) {
			avgScore = await ctx.db.getAvgScore(gamedata.gameID)
		} else {
			avgScore = 0
		}
		await ctx.render('allReviews', {review: reviews, thisgame: gamedata, reviewNo: reviewCount,
			avgScore: avgScore, user: ctx.session.authorised, admin: await ctx.db.isUserAdmin(ctx.session.userID)})
	} catch(err) {
		ctx.body = err.message
	}
})

// eslint-disable-next-line max-lines-per-function
game.get('/allComments:id', async ctx => {
	try {
		const review = await ctx.db.getReview(Number(ctx.params.id))
		const game = await ctx.db.getGame(Number(review.game))
		const comments = (await ctx.db.getCommentsForReview(Number(review.id))).reverse()
		const commentCount = comments.length
		await ctx.render('allComments', {review: review, game: game, comments: comments, commentCount: commentCount})
	} catch(err) {
		ctx.body = err.message
	}
})

game.post('/add', async ctx => {
	try {
		const body = ctx.request.body
		const reviewText = body.rvtext
		const user = await ctx.db.getUser(ctx.session.userID)
		const review = new Review(user.username, body.gameID, body.starRating, reviewText, 'DD/MM/YYYY', 'no')
		await ctx.db.createReview(review)
		ctx.redirect(`/game${body.gameID}`)
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})


game.post('/postComment', async ctx => {
	try {
		const body = ctx.request.body
		const user = await ctx.db.getUser(ctx.session.userID)
		console.log(user)
		const comment = new Comment(body.gameID, body.reviewID, user.username, 'DD/MM/YYYY', 'XX:YY:ZZ', body.commentText)
		await ctx.db.postComment(comment)
		ctx.redirect(`/allReviews${body.gameID}`)
	} catch(err) {
		console.log(err.message)
	}
})

game.post('/showAllReviews', async ctx => {
	try {
		const body = ctx.request.body
		ctx.redirect(`/allReviews${body.gameID}`)
	} catch(err) {
		console.log(err.message)
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
game.post('/showAllComments', async ctx => {
	try {
		const body = ctx.request.body
		ctx.redirect(`/allComments${body.reviewID}`)
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})

module.exports = game

