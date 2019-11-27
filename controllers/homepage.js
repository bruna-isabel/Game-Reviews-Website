'use strict'

const Router = require('koa-router')

const homepage = new Router({ prefix: '/homepage' })

homepage.get('/', async ctx => {
	await ctx.render('homepage.hbs',{user: ctx.session.authorised, admin: await ctx.db.isUserAdmin(ctx.session.userID)})
})

module.exports = homepage

