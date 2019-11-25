'use strict'

const Router = require('koa-router')

const adding = new Router({prefix: '/adding'})

adding.get('/game', async ctx => {
	console.log( ctx.session.userID )
	const a = ctx.session.userID
	const user = await ctx.db.getUser(Number(a))
	const platformnames = await ctx.db.getAllPlatforms()
	await ctx.render('addingGames.hbs', {platforms: platformnames})

	if(!user) {
		console.log('you are not allowed to add any games')
	}

})


adding.post('/game', async ctx => {
	const body = ctx.request.body
	body.submittedBy = ctx.session.userID
	const platforms = body.platforms
	body.platforms = platforms.join(',')
	console.log(body)
	await ctx.db.addGame(body)
	console.log(platforms)
})
module.exports = adding
