'use strict'

const Router = require('koa-router')
const signup = new Router()


signup.get('/signup', async ctx => {
	await ctx.render('signup.hbs')
})

signup.post('/signup', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
})

module.exports = signup

