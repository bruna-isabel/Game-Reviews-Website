'use strict'

const Router = require('koa-router')

const homepage = new Router({ prefix: '/homepage' })

homepage.get('/', async ctx => {
<<<<<<< HEAD
	await ctx.render('homepage.hbs')
})

homepage.post('/', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
=======
	await ctx.render('homepage.hbs', {user: ctx.session.authorised})
>>>>>>> navbar
})

module.exports = homepage

