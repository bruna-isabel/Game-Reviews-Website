/* eslint-disable complexity */
'use strict'

const request = require('request')
const path = require('path')
const Game = require(path.join(__dirname, '/../models/game'))
const db = require(path.join(__dirname, '/../db'))

const dbctx = new db.SqliteDbContext(path.join(__dirname, '/../app.db'))

// eslint-disable-next-line max-lines-per-function
request('https://api.steampowered.com/ISteamApps/GetAppList/v2/', (error, response, body) => {
	const allGames = JSON.parse(body)
	let i = 1
	const gameAmount = 100 //change according to how many games you want to add
	for(i; i<gameAmount; i++) {
		const gameid = allGames.applist.apps[i].appid //getting the appID to insert into next URL as a string
		gameid.toString()
		// eslint-disable-next-line max-lines-per-function
		request(`https://store.steampowered.com/api/appdetails/?appids=${gameid}` , (error, response, body) => {
			//console.log(gameid)
			if (response.statusCode !== 200) {
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
				//Creating Game Object
				const game = new Game(
					gameData.name,
					'38', //Most Steam games are on Windows
					'Slugline',
					gameData.short_description,
					gameData.release_date.date,
					gameData.developers[0], //not every game has developers listed so it repeats the publisher
					gameData.publishers[0],
					'admin',
					'yes',
					gameData.header_image,
					gameData.screenshots[0].path_thumbnail)
				dbctx.addGame(game)
				//console.log(gameData)
			} catch(err) {
				console.log(body)
				throw TypeError(`Game: https://store.steampowered.com/api/appdetails/?appids=${gameid}  ${err}`)
			}
		})
	}
})
