'use strict'

const Router = require('koa-router')

const { authenticateUser } = require('./middleware/auth')

const home = new Router({ prefix: '/' })

home.get('/', authenticateUser, async ctx => {
	const user = await ctx.db.getUser(ctx.session.userID)
	ctx.response.body = `You're in ${user.username}`
})

module.exports = home
