'use strict'

const Router = require('koa-router')
const db = require('../db.js')
const list = new Router({prefix: '/list'})

list.get('/', async ctx => {
	try {
		const approved = await ctx.db.approvalGameList(true)
		const categories = await ctx.db.getCategories()

		//changing submittedBy from an ID to the username
		let game
		for(game of approved) {
			const user = await ctx.db.getUser(game.submittedBy)
			game.submittedBy = user.username
		}

		await ctx.render('listpage.hbs', {games: approved, category: categories})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

list.get('/:category/', async ctx => {
	const categoryID = await ctx.db.getCategory(ctx.params.category)
	console.log(categoryID)
	const games = await ctx.db.getGamesWithCategory(categoryID.id)
  await ctx.render('listpage.hbs', {games: games})
})


list.post('/', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
})

module.exports = list
