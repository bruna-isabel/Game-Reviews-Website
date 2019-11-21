'use strict'

const Router = require('koa-router')

const list = new Router({prefix: '/list'})

list.get('/', async ctx => {
	try {
		const approved = await ctx.db.approvalGameList(true)
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

