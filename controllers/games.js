'use strict'

const Router = require('koa-router')
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const games = new Router()


games.get('/games', async ctx => {
	const genre = [
		{
			"id": 1,
			"name": 'action'
		},
		{
			"id": 2,
			"name": 'adventure'
		},
		{
			"id": 3,
			"name": 'strategy'
		}
	]

	await ctx.render('games.hbs', {genres: genre})
})

games.get('/games/:genre/', async ctx => {
	//select * from games where genre_id = ctx.params.genre_id (mais ou menos)
	ctx.body = ctx.params.name
})

module.exports = games