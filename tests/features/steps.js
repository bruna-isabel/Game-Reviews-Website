/* eslint-disable max-lines */
/* eslint-disable prefer-arrow-callback */
'use strict'

const path = require('path')
const assert = require('assert')
const Game = require('../../models/game')
const Review = require('../../models/review')

const {
	Given,
	When,
	Then,
	Before,
	After,
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
AfterAll(async function() {
	await server.close()
	await browser.close()
})

// create a fresh page each scenario
Before(async function() {
	currentPage = await browser.newPage()
})

After(async function() {
	await currentPage.close()
})

Given('username is {string} and password is {string}', async function(user, pass) {
	await currentPage.goto(`http://${hostname}/login`)

	await currentPage.type('input[name=username]', user)
	await currentPage.type('input[name=password]', pass)
})

Given('I am logged in as user {string} with password {string}', async function(user, pass) {
	// enter and submit login details
	await currentPage.goto(`http://${hostname}/login`)
	await currentPage.type('input[name=username]', user)
	await currentPage.type('input[name=password]', pass)
	await currentPage.click('button[type=submit]')
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

Given('The browser is open on the adding game page', async function() {
	await currentPage.goto(`http://${hostname}/adding/game`)
})

When('I enter {string} on the {string} field', async function(value, field) {
	await currentPage.type(`input[name=${field}]`, value)
})

When('I upload {string} in the {string} field', async function(file, field) {
	const fileInput = await currentPage.$(`input[name=${field}]`)
	await fileInput.uploadFile(path.join(__dirname, file))
})

When('I submit the form', async function() {
	try {
		await currentPage.click('button[type=submit]')
	} catch (err) {
		await currentPage.click('input[type=submit]')
	}
})

When('game is approved by admin', async function() {
	const games = await app.context.db.getGames()
	const g = games[games.length - 1]
	g.approved = 'yes'

	await app.context.db.updateGame(g)
})

Then('the game should be added to the webpage', async function() {
	await currentPage.goto(`http://${hostname}/list`)
	const title = await currentPage.evaluate(
		() => document.querySelector('.game-row:last-child > .title').textContent
	)
	assert(title === 'game1', `got ${title}`)
})

Given('I log in as username {string}, password {string}', async function(username, password) {
	await currentPage.goto(`http://${hostname}/login`)
	await currentPage.type('input[name=username]', username)
	await currentPage.type('input[name=password]', password)
	await currentPage.click('button[type=submit]')
})

When('game is {string}', async function(title) {
	//console.log(`${title}`)
	const game = new Game(title, 'slugline', 'summ', 'date', 'dev',
		'pub',1,'no','defaultposter.pmg','defaultsplash.png')
	//console.log(game)
	await app.context.db.createGame(game)
	await currentPage.goto(`http://${hostname}/approval/games`)
})

Then('I approve', async function() {
	//console.log(currentPage.url())
	await currentPage.click('input[value="Approve"]')
})

Then('I reject', async function() {
	//console.log(currentPage.url())
	await currentPage.click('input[value="Reject"]')
})

Then('I should be able to find the game in the list page', async function() {
	await currentPage.goto(`http://${hostname}/list`)
	const lastGame = await currentPage.evaluate(
		() => document.querySelector('.game-row:last-child > .title').textContent
	)
	assert(lastGame === 'gameApprove')
})

Then('I should not be able to find the game in the list page', async function() {
	await currentPage.goto(`http://${hostname}/list`)
	const lastGame = await currentPage.evaluate(
		() => document.querySelector('.game-row:last-child > .title').textContent
	)
	assert(lastGame !== 'gameReject')
})

When('review is {string}', async function(text) {
	const review = new Review('admin','1',1,text,'date','yes')
	await app.context.db.createReview(review)
	await currentPage.goto(`http://${hostname}/approval/reviews`)
})

Then('I should be able to find the review in the games individual page', async function() {
	await currentPage.goto(`http://${hostname}/game1`)
	const review = await currentPage.evaluate(
		() => document.querySelector('#reviewText').textContent
	)
	console.log(review)
	assert(review ==='reviewApprove')
})

Then('I should not be able to find the review in the games individual page', async function() {
	await currentPage.goto(`http://${hostname}/game1`)
	const review = await currentPage.evaluate(
		() => document.querySelector('#reviewText').textContent
	)
	assert(review !=='reviewReject')
})
