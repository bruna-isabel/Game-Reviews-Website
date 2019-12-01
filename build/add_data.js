/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
'use strict'

const request = require('request')
const path = require('path')
const Game = require(path.join(__dirname, '/../models/game'))
const db = require(path.join(__dirname, '/../db'))
const dbctx = new db.SqliteDbContext(path.join(__dirname, '/../app.db'))

//Automatically inserted data
request('https://api.steampowered.com/ISteamApps/GetAppList/v2/', async(error, response, body) => {
	const allGames = JSON.parse(body)
	let i = 1
	const gameAmount = 200 //change according to how many games you want to add
	for(i; i<gameAmount; i++) {
		const gameid = allGames.applist.apps[i].appid //getting the appID to insert into next URL as a string
		gameid.toString()
		request(`https://store.steampowered.com/api/appdetails/?appids=${gameid}` , async(error, response, body) => {
			//console.log(gameid)
			const statusInt = 200
			if (response.statusCode !== statusInt) {
			//if the api doesn't load the page, skip
				return
			}
			try {
				const gameObj = JSON.parse(body)
				if(gameObj[gameid].success === false) {
				//checking if it found the game
					return
				}
				if(!gameObj[gameid].data.hasOwnProperty('developers')) {
				//checking if the developer property exists
					return
				}
				if(!gameObj[gameid].data.hasOwnProperty('screenshots')) {
				//if game has no screenshots, skip
					return
				}
				const gameData = gameObj[gameid].data
				if(gameData.type !== 'game') {
					return
				}
				//Creating Game Object
				let game = new Game(
					gameData.name,
					gameData.short_description,
					gameData.about_the_game.replace(/<[^>]*>?/gm, ''),
					gameData.release_date.date,
					gameData.developers[0], //not every game has developers listed so it repeats the publisher
					gameData.publishers[0],
					1,
					'yes',
					gameData.header_image,
					gameData.screenshots[0].path_thumbnail)
				game.categories = []
				let category
				for(let i=0; i<gameData.genres.length; i++) {
					gameData.genres[i].id = -1
					gameData.genres[i].name = gameData.genres[i].description
					delete gameData.genres[i].description
					try{
						category = await dbctx.createCategory(gameData.genres[i])
					} catch(err) {
						category = await dbctx.getCategory(gameData.genres[i].name)
					}
					game.categories.push(category)
				}
				game = await dbctx.createGame(game)
				const pltfrm = 38
				const platform = await dbctx.getPlatform(pltfrm)
				await dbctx.linkGamePlatform(game, platform)
			} catch(err) {
				throw new Error(`Game: https://store.steampowered.com/api/appdetails/?appids=${gameid}  ${err}`)
			}
		})
	}
})
