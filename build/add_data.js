'use strict'

const request = require('request')
const path = require('path')
const Game = require(path.join(__dirname, '/../models/game'))
const db = require(path.join(__dirname, '/../db'))

const dbctx = new db.SqliteDbContext(path.join(__dirname, '/../app.db'))

// eslint-disable-next-line max-lines-per-function
request('https://api.steampowered.com/ISteamApps/GetAppList/v2/', (error, response, body) => {
	const allGames = JSON.parse(body)
	let i = 200
	const gameAmount = 300 //change according to how many games you want to add
	for(i; i<gameAmount; i++) {
		const gameid = allGames.applist.apps[i].appid //getting the appID to insert into next URL as a string
		gameid.toString()
		// eslint-disable-next-line max-lines-per-function
		request(`https://store.steampowered.com/api/appdetails/?appids=${gameid}` , (error, response, body) => {
			//console.log(gameid)
			try {
				if(!JSON.parse(body)) {
					return
				}
				const gameObj = JSON.parse(body)
				//console.log(body)
				/*
				if(typeof gameObj === 'undefined') {
				//checking whether the url is has no data at all
					return
				}
				*/
				if(gameObj[gameid].success === false) {
				//checking if it found the game
					return
				}
				if(!gameObj[gameid].data.hasOwnProperty('developers')) {
				//checking if the developer property exists
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
					gameData.background)
				dbctx.addGame(game)
				//console.log(gameData)
			} catch(err) {
				console.log(body)
				throw TypeError(`Game: https://store.steampowered.com/api/appdetails/?appids=${gameid}  ${err}`)
			}
		})
	}
})
