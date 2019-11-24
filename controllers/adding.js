'use strict'

const Router = require('koa-router')
const koaBody = require('koa-body')()

const adding = new Router({prefix: '/adding'})

adding.get('/game', async ctx => {
	console.log( ctx.session.userID )
	const a = ctx.session.userID
	const user = await ctx.db.getUser(Number(a))
	const platformnames = await ctx.db.getAllPlatforms()
	await ctx.render('addingGames.hbs', {platforms: platformnames})

	if(!user) {
		console.log('you are not allowed to add any games')
	}
})


adding.post('/game',koaBody,async ctx => {
	console.log('hello')
	const body = ctx.request.body
	await ctx.db.addGame(body)
	body.submittedBy = ctx.session.userID
	
})
module.exports = adding
