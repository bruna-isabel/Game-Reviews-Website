'use strict'

function authenticateUser(ctx, next) {
	// if not authorised, redirect to login
	if (!ctx.session.authorised)
		return ctx.redirect('/login?errorMsg=Please%20login%20to%20continue')

	return next()
}

module.exports = {
	authenticateUser
}
