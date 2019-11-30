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

const getLoginError = async() => currentPage.evaluate(() => {
	const msgEl = document.getElementsByClassName('error-msg')[0]
	return msgEl ? msgEl.textContent.trim() : ''
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
	const errorMsg = await getLoginError()
	assert(!errorMsg, `got: ${errorMsg}`)
})

Then('I should be redirected to {string}', function(page) {
	const currentURL = currentPage.url()
	if (!page.startsWith('/')) page = `/${page}`

	assert(currentURL === `http://${hostname}${page}`, `got: ${currentURL}`)
})

Then('I should be asked to try again with an error telling me the password was incorrect', async function() {
	const errorMsg = await getLoginError()
	assert(errorMsg === 'Password incorrect', `got: ${errorMsg}`)
})

Then('I should be asked to try again with an error telling me the username doesn\'t exist', async function() {
	const errorMsg = await getLoginError()
	assert(errorMsg === 'User does not exist', `got: ${errorMsg}`)
})
