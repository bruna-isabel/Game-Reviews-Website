/* eslint-disable prefer-arrow-callback */
'use strict'

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

/** @type {puppeteer.Browser} */
let browser
/** @type {puppeteer.Page} */
let currentPage
let server
let hostname

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

When('I try to log in', async() => {
	await currentPage.click('button[type=submit]')
})

Then('I should be redirected and logged in successfully', async function() {
	const currentURL = currentPage.url()
	console.log(await currentPage.content())
	assert(currentURL === `http://${hostname}/`, `got ${currentURL}`)
})

Given('username is {string} and password is not {string}', function(user, pass) {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I should be asked to try again with an error telling me the password was incorrect', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Given('username is not {string} and password is {string}', function(user, pass) {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})

Then('I should be asked to try again with an error telling me the username doesn\'t exist', function() {
	// Write code here that turns the phrase above into concrete actions
	return 'pending'
})
