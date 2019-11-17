'use strict'

const Router = require('koa-router')

const koaBody = require('koa-body')()

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

approval.post('/games', koaBody, async ctx => {
	const body = ctx.request.body
	const id = parseInt(Object.keys(body)[0]) //getting the key (gameID) and converting it into an integer
	const game = await ctx.db.getGame(id)
	if(body[id] === 'Approve') {
		game['approved'] = 'yes'
		await ctx.db.updateGame(game)
	} else if(body[id] === 'Reject') {
		await ctx.db.deleteGame(id)
	}
	ctx.redirect('/approval/games')
})

module.exports = approval
