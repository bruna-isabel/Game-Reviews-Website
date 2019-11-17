'use strict'

const Router = require('koa-router')
const koaBody = require('koa-body')()

const adding = new Router({prefix: '/adding'})

adding.get('/game', async ctx => {
	const user = await ctx.db.getUser(id)


		if(user= ctx.session.userID) {
			continue 
} 
		else {
			console.log('you are not allowed to add any games')
		}
	}
})

adding.post('/game',koaBody,async ctx =>{
	const body = ctx.request.body
	const games = await ctx.db.getGames()
	const game
	if (body[game] != games){
			await ctx.db.addGame(game)
	}
			else {
				console.log('this game already exists')
	}		

})