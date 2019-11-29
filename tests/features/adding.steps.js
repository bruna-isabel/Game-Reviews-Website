'use strict'
// eslint-disable-next-line strict
const assert = require('assert')
const {runSQLScript} = require('../../build/utils')
const {
	Given,
	When,
	Then,
	Before,
	BeforeAll,
	AfterAll,
} = require('cucumber')

const puppeteer = require('puppeteer')

const app = require('../../app')
const {SqliteDbContext } = require('../../db')

/** @type {puppeteer.Browser} */
let browser
/** @type {puppeteer.Page} */
let currentPage
let server
let hostname

BeforeAll(async () => {
	// set up browser
	browser = await puppeteer.launch({
		headless: true,
		defaultViewport: {
			width: 600,
			height: 800
		}
	})
	const dbcontext= new SqliteDbContext(':memory:')
	const db = await dbcontext.sqlitePromise
	runSQLScript(db,'../../build/build_db.sql')
	app.context.db = dbcontext


	server = app.listen(0)
	const addr = server.address()
	hostname = `${addr.address === '::' ? 'localhost' : addr.address}:${addr.port}`
})

AfterAll(() => {
	server.close()
	browser.close()
})
Before(async () => {
	currentPage = await browser.newPage()
	const db = await app.context.db.sqlitePromise
	db.exec('DELETE FROM `games`;') 
})
Given('The browser is open on the adding game page', async() => {
	await currentPage.goto(`http://${hostname}/adding/game`)
})
When('I enter {string} on the {string} field', async(value, field) => {
	await currentPage.type(`input[name=${field}]`, value)
})

When('game is approved by admin', async() => {
	const games = await app.context.db.getGames()
	assert( games.length === 1 )
	const g = games[0]
	g.approved = 'yes'
	await app.context.db.updateGame(g)
})

Then('the game should be added to the webpage', async() => {
	await currentPage.goto(`http://${hostname}/list`)
	const gameOnPage = await currentPage.evaluate(() => {
		const firstEntry = document.getElementsByClassName('game-row')[0]
		return firstEntry.textContent
	})
})
