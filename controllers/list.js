'use strict'

const Router = require('koa-router')

const list = new Router({prefix: '/list'})

list.get('/', async ctx => {
	try {
		const games = await ctx.db.getGames()
		let i
		const approved = []
		for (i = 0; i < games.length; i++) {
			if(games[i]['approved'] === 'yes') {
				approved.push(games[i])
			} else {
				continue
			}
		}
		await ctx.render('listpage.hbs', {games: approved})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

list.post('/', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
})

module.exports = list

