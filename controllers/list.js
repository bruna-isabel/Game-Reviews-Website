'use strict'

const Router = require('koa-router')
const db = require('../db.js')
const list = new Router({prefix: '/list'})

// eslint-disable-next-line max-lines-per-function
list.get('/', async ctx => {
	try {
		const approved = await ctx.db.approvalGameList(true)
		const categories = await ctx.db.getCategories()

		//changing submittedBy from an ID to the username
		//adding the avg rating as an attribute
		let game
		for(game of approved) {
			const user = await ctx.db.getUser(game.submittedBy)
			game.submittedBy = user.username
			const rating = await ctx.db.getAvgScore(game.gameID)
			game.rating = rating
			/*
			if(isNaN(rating)) { //function returns NaN if there are no reviews for the game
				game.rating = 'No Reviews Yet'
			} else {
				game.rating = rating
			*/
			if(game.poster.startsWith('http')) {
				game.url = true
			}
		}

		await ctx.render('listpage.hbs', {games: approved, user: ctx.session.authorised,
			admin: await ctx.db.isUserAdmin(ctx.session.userID), category: categories})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

list.get('/:category/', async ctx => {
	const categoryID = await ctx.db.getCategory(ctx.params.category)
	const categories = await ctx.db.getCategories()

	console.log(categoryID)
	const games = await ctx.db.getGamesWithCategory(categoryID.id)
	await ctx.render('listpage.hbs', {games: games, category: categories})
})


list.post('/', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
})

module.exports = list
