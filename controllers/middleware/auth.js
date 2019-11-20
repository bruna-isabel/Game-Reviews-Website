'use strict'

function authenticateUser(ctx, next) {
	// if not authorised, redirect to login
	if (!ctx.session.authorised)
		return ctx.redirect('/login')

	return next()
}

module.exports = {
	authenticateUser
}
