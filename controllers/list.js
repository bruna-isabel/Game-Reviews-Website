'use strict'

const Router = require('koa-router')

const list = new Router({prefix: '/list'})

// eslint-disable-next-line max-lines-per-function
list.get('/', async ctx => {
	try {
		const approved = await ctx.db.approvalGameList(true)

		//changing submittedBy from an ID to the username
		//adding the avg rating as an attribute
		let game
		for(game of approved) {
			const user = await ctx.db.getUser(game.submittedBy)
			game.submittedBy = user.username
			const rating = await ctx.db.getAvgScore(game.gameID)
			if(isNaN(rating)) { //function returns NaN if there are no reviews for the game
				game.rating = 'No Reviews Yet'
			} else {
				game.rating = rating
			}
		}
		await ctx.render('listpage.hbs', {games: approved})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

list.post('/', async ctx => {
	console.log(ctx.query)
	console.log(ctx.querystring)
})

module.exports = list
