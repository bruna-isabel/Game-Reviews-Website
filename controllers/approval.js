'use strict'

const Router = require('koa-router')

const approval = new Router({prefix: '/approval'})

approval.get('/games', async ctx => {
	//maybe check if user is an admin
	const games = await ctx.db.getGames()
	let i
	const unapproved = []
	for (i = 0; i < games.length; i++) {
		if(games[i]['approved'] === 'no') {
			unapproved.push(games[i])
		} else {
			continue
		}
	}
	//or just run a query to get all where approved == 'no'
	await ctx.render('approvalGames.hbs', {games: unapproved})
})

approval.post('/games', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
})

module.exports = approval
