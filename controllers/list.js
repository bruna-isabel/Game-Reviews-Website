'use strict'

const Router = require('koa-router')

const list = new Router({prefix: '/list'})

list.get('/', async ctx => {
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
	console.log(approved)
	await ctx.render('listpage.hbs', {games: approved})
})

list.post('/', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
})

module.exports = list

