'use strict'

const Router = require('koa-router')

const list = new Router({prefix: '/list'})

list.get('/', async ctx => {
	const games = await ctx.db.getGames()
	await ctx.render('listpage.hbs', {games: games})
})

list.post('/', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
})

module.exports = list

