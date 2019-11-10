'use strict'

const Router = require('koa-router')

const { authenticateUser } = require('./middleware/auth')

const home = new Router({ prefix: '/' })

home.get('/', authenticateUser, ctx => {
	ctx.response.body = 'You\'re in'
})

module.exports = home
