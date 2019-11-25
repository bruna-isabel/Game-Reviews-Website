'use strict'

const Router = require('koa-router')
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const listrouter = new Router ({prefix: '/games'})

const game = {
  "info": [
    {
      "title":"Roblox",
      "year": 2019,
      "description":"A game where you have to build your own robots with blocks but without being destroyed by the monster", 
      "genre": 'action'
    },
    {
      "title": "League of Angels",
      "year": 2014,
      "description": "A game full of adventure. There are some rules you need to follow in order to stay alive!Will you manage to cope?;)",
      "genre": 'adventure'
    },
    {
      "title": "Fireboy and Watergirl",
      "year": 2002,
      "description": "You need to cooperate with your lover to get out of this tunel alive. A very exciting game with a lot of stages",
      "genre": 'strategy'
    },
  ]
}
const genre = [
  {
    "id": 1,
    "genre": 'action'
  },
  {
    "id": 2,
    "genre": 'adventure'
  },
  {
    "id": 3,
    "genre": 'strategy'
  }
]

listrouter.get('/', async ctx => {

  console.log('hello')
	await ctx.render('listpage.hbs', {info: game.info, genres: genre})
})


//games page with filter on genre
listrouter.get('/:genre/', async ctx => {

  const gameslist = []
  
  for (let i = 0; i < game.info.length; i++) {
    if (game.info[i].genre === ctx.params.genre) {
      gameslist.push(game.info[i])
		}
}
  console.log(gameslist)
  const title = ctx.params.genre
  await ctx.render('listpage.hbs', {info: gameslist, genres: genre, type: title})
})

module.exports = listrouter