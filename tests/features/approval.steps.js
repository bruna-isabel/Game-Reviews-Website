'use strict'

const assert = require('assert')
const {
	beforeAll,
	afterAll,
	Given,
	When,
	And,
	Then
} = require('cucumber')

const Game = require('../../models/game')
const newGame = Game(
	'game1', '38', 'slugline', 'summary', '19/10/1998', 'Nintendo', 'Kakao',
	1, 'no', 'defaultposter.omg', 'defaultsplash.pmg'
)

const Review = require('../../models/review')
const newReview = Review(
	'admin', 1, 1, 'Amazing game', '20/10/1998', 'no'
)

const db = require('../..db')
const dbctx = new db(':memory:')


const app = require('../../app')
const puppeteer = require('puppeteer')

const width = 1920
const height = 1080
const port = 8080

let browser
let page
let server

beforeAll(async() => {
	browser = await puppeteer.launch({ headless: true, args: [`--window-size=${width},${height}`] })
	page = await browser.newPage()
	await page.setViewport({ width, height })
	server = app.listen(port)
	dbctx.createGame(newGame)
	dbctx.createReview(newReview)
})

afterAll( () => {
	browser.close()
	server.close()
	dbctx.deleteGame(1)
	dbctx.deleteReview(1)
})

Given('The browser is open on the aprpoval/games page', async() => {
	await page.goto(`http://localhost:${port}/approval/games`, { timeout: 30000, waitUntil: 'load' })
})

When('I find the game I want to approve', async() => {
	const gameTitle = document.getElementsByClassName('title')[0].textContent
	assert(gameTitle === 'game1')
	console.log(gameTitle)
})

And('I click on the approve button', async() => {
	await page.click('button[type=submit]')
})

Then('I should no longer be able see the game in the approval/games page', async() => {
	const gameTitle = document.getElementsByClassName('title')[0].textContent
	//^ shouldnt exist
})

And('I should be able to find the game in the list page', async() => {
	await page.goto(`http://localhost:${port}/list`)
	const gameTitle = document.getElementsByClassName('title')[0].textContent
	assert(gameTitle === 'game1')
})
