'use strict'

const Router = require('koa-router')

const logout = new Router({ prefix: '/logout' })

logout.get('/', ctx => {
	ctx.session.authorised = false
	return ctx.redirect('back')
})

module.exports = logout
