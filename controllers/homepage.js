'use strict'

const Router = require('koa-router')

const homepage = new Router({ prefix: '/homepage' })

homepage.get('/', async ctx => {
	await ctx.render('homepage.hbs', {user: ctx.session.user})
})

module.exports = homepage

