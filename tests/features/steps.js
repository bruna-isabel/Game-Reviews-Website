/* eslint-disable max-lines */
/* eslint-disable prefer-arrow-callback */
'use strict'

const path = require('path')
const assert = require('assert')

const {
	Given,
	When,
	Then,
	Before,
	BeforeAll,
	AfterAll
} = require('cucumber')

const puppeteer = require('puppeteer')

const app = require('../../app')
const { SqliteDbContext } = require('../../db')
const { runSQLScript } = require('../../build/utils')

/** @type {puppeteer.Browser} */
let browser
/** @type {puppeteer.Page} */
let currentPage
let server
let hostname

async function buildDatabase() {
	const dbContext = new SqliteDbContext()
	const db = await dbContext.sqlitePromise

	await runSQLScript(db, path.join(__dirname, '../../build/build_db.sql'))
	await runSQLScript(db, path.join(__dirname, '../../build/add_data.sql'))

	return dbContext
}

async function getLoginError(page) {
	return page.evaluate(() => {
		const msgEl = document.getElementsByClassName('error-msg')[0]
		return msgEl ? msgEl.textContent.trim() : ''
	})
}

// start the browser and server
BeforeAll(async function() {
	// set up browser
	browser = await puppeteer.launch({
		headless: true,
		defaultViewport: {
			width: 600,
			height: 800
		}
	})

	app.context.db = await buildDatabase()
	// set up Koa app
	server = app.listen(0)

	const addr = server.address()
	hostname = `${addr.address === '::' ? 'localhost' : addr.address}:${addr.port}`
})

// close browser and server
AfterAll(function() {
	server.close()
	browser.close()
})

// create a fresh page each scenario
Before(async function() {
	currentPage = await browser.newPage()
})

Given('username is {string} and password is {string}', async function(user, pass) {
	await currentPage.goto(`http://${hostname}/login`)

	await currentPage.type('input[name=username]', user)
	await currentPage.type('input[name=password]', pass)
})

When('I try to log in', async function() {
	await currentPage.click('button[type=submit]')
})

Then('I should be logged in successfully', async function() {
	const errorMsg = await getLoginError(currentPage)
	assert(!errorMsg, `got: ${errorMsg}`)
})

Then('I should be redirected to {string}', function(page) {
	const currentURL = currentPage.url()
	if (!page.startsWith('/')) page = `/${page}`

	assert(currentURL === `http://${hostname}${page}`, `got: ${currentURL}`)
})

Then('I should be asked to try again with an error telling me the password was incorrect', async function() {
	const errorMsg = await getLoginError(currentPage)
	assert(errorMsg === 'Password incorrect', `got: ${errorMsg}`)
})

Then('I should be asked to try again with an error telling me the username doesn\'t exist', async function() {
	const errorMsg = await getLoginError(currentPage)
	assert(errorMsg === 'User does not exist', `got: ${errorMsg}`)
})

Given('The browser is open on the aprpoval/games page', async function() {
	await currentPage.goto(
		`http://${hostname}/approval/games`,
		{ timeout: 30000, waitUntil: 'load' }
	)
})

When('I find the game I want to approve', async function() {
	const gameTitle = document.getElementsByClassName('title')[0].textContent
	assert(gameTitle === 'game1')
	console.log(gameTitle)
})

Then('I click on the approve button', async function() {
	await currentPage.click('button[type=submit]')
})

Then('I should no longer be able see the game in the approval/games page', async function() {
	const gameTitle = document.getElementsByClassName('title')[0].textContent
	//^ shouldnt exist
})

Then('I should be able to find the game in the list page', async function() {
	await currentPage.goto(`http://${hostname}/list`)
	const gameTitle = document.getElementsByClassName('title')[0].textContent
	assert(gameTitle === 'game1')
})

Given('The browser is open on the adding game page', async function() {
	await currentPage.goto(`http://${hostname}/adding/game`)
})

When('I enter {string} on the {string} field', async function(value, field) {
	await currentPage.type(`input[name=${field}]`, value)
})

When('game is approved by admin', async function() {
	const games = await app.context.db.getGames()
	assert( games.length === 1 )
	const g = games[0]
	g.approved = 'yes'
	await app.context.db.updateGame(g)
})

Then('the game should be added to the webpage', async function() {
	await currentPage.goto(`http://${hostname}/list`)
	const gameOnPage = await currentPage.evaluate(() => {
		const firstEntry = document.getElementsByClassName('game-row')[0]
		return firstEntry.textContent
	})
})

Given('The browser is open on the approval\/games page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I should no longer be able to see the game in the approval\/games page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Given('The browser is open on the approval\/games page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

When('I find the game I want to reject', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

When('I click on the reject button', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I should no longer be able see the game in the approval\/games page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I shouldn\'t be able to find the game in the list page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

When('I find the review I want to approve', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I should be able to find the review in the games individual page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Given('The browser is open on the approval reviews page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

When('I find the review I want to reject', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I shouldn\'t be able to find the review in the games individual page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Given('The browser is open on the approval games page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I should no longer be able to see the game in the approval games page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I should no longer be able see the game in the approval games page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I should no longer be able to see the review in the approval reviews page', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})
