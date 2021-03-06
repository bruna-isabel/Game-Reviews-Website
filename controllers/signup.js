'use strict'

const Router = require('koa-router')
const userValidation = require('../utils/uservalidation.js')
const User = require('../models/user.js')

const signup = new Router()


signup.get('/signup', async ctx => ctx.render('signup.hbs'))

signup.post('/signup', async ctx => {

	const body = ctx.request.body
	//validation of the data
	try{
		await userValidation.validateUsername(body.username)
		await userValidation.validatePassword(body.password)
		await userValidation.validateConfirmPassword(body.password, body.confirmPassword)

		const user = await User.createFromPlainText(body.username, body.password)
		await ctx.db.createUser(user)//adds new user to database
		return ctx.redirect('homepage')
	} catch(err) {
		return ctx.render('signup.hbs', { errorMsg: err.message})
	}

})

module.exports = signup
