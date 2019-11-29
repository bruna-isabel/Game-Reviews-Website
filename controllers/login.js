'use strict'

const Router = require('koa-router')
const koaBodyParser = require('koa-bodyparser')
const bcrypt = require('bcrypt')

const login = new Router({ prefix: '/login' })

const { EntityNotFound } = require('../utils/errors')

login.use(koaBodyParser())

login.get('/', async ctx => ctx.render('login.hbs'))

login.post('/', async ctx => {
	const { username, password } = ctx.request.body
	const redirect = ctx.query.refer || '/'

	const user = await getUser(ctx.db, username)
	if (!user) {
		return ctx.render('login.hbs', { errorMsg: 'User does not exist' })
	}

	if (await bcrypt.compare(password, user.hash)) {
		ctx.session.authorised = true
		ctx.session.userID = user.id
		return ctx.redirect(redirect)
	} else {
		return ctx.render('login.hbs', { errorMsg: 'Password incorrect' })
	}
})

async function getUser(db, username) {
	try {
		// try to get the user by username
		const user = await db.getUser(username)
		return user
	} catch (error) {
		// if an EntityNotFound error is thrown, return null
		if (error instanceof EntityNotFound) {
			return null
		}

		// else re-throw the error
		throw error
	}
}

module.exports = login
