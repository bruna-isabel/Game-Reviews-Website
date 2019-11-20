'use strict'

const Router = require('koa-router')
const koaBody = require('koa-body')()

const adding = new Router({prefix: '/adding'})

adding.get('/adding', async ctx => {
	console.log( ctx.session.userID )
	let a = ctx.session.userID
	const user = await ctx.db.getUser(a)

	if(!user) {
		console.log('you are not allowed to add any games')
	}

	return ctx.render('addingGames.hbs')
})

adding.post('/adding',koaBody,async ctx => {
	const body = ctx.request.body
	await ctx.db.addGame(body)
	body.submittedBy = ctx.session.userID
})
module.exports = adding
