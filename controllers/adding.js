'use strict'

const Router = require('koa-router')
const koaBody = require('koa-body')()

const adding = new Router({prefix: '/adding'})

adding.get('/game', async ctx => {
	const user = await ctx.db.getUser(ctx.session.userID)

	if(!user) {
		console.log('you are not allowed to add any games')
	}

})

adding.post('/game',koaBody,async ctx => {
	const body = ctx.request.body
	await ctx.db.addGame(body)
	body.submittedBy = ctx.session.userID

})
