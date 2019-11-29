'use strict'

const Router = require('koa-router')
const bcrypt = require('bcrypt')
//Using koabody and bodyparser together breaks the code
const login = new Router({ prefix: '/login' })

const { EntityNotFound } = require('../utils/errors')


login.get('/', async ctx => ctx.render('login.hbs'))

login.post('/', async ctx => {
	const { username, password } = ctx.request.body
	const redirect = ctx.query.refer || '/homepage'

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
