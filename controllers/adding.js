'use strict'

const Router = require('koa-router')

const adding = new Router({prefix: '/adding'})

const { authenticateUser } = require('../controllers/middleware/auth')

adding.get('/game', authenticateUser, async ctx => {

	const a = ctx.session.userID
	const user = await ctx.db.getUser(a)
	const platformnames = await ctx.db.getAllPlatforms()
	const categories = await ctx.db.getCategories()
	await ctx.render('addingGames.hbs', {platforms: platformnames, user: ctx.session.userID,
		categories: categories, admin: await ctx.db.isUserAdmin(ctx.session.userID)})

	if(!user) {
		console.log('you are not allowed to add any games')
	}

})


adding.post('/game', authenticateUser, async ctx => {
	const body = ctx.request.body
	body.submittedBy = ctx.session.userID
	body.approved = 'no'
	//createGame expects a list of objects for body.categories and body.platforms
	for(let i=0; i<body.categories.length; i++) {
		const categoryId = parseInt(body.categories[i])
		const category = await ctx.db.getCategory(categoryId)
		body.categories[i] = category
	}
	for(let i=0; i<body.platforms.length; i++) {
		const platformId = parseInt(body.platforms[i])
		const platform = await ctx.db.getPlatform(platformId)
		body.platforms[i] = platform
	}
	await ctx.db.createGame(body)
	return ctx.redirect('/adding/game')
})
module.exports = adding
