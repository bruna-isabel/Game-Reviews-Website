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

const app = require('../../app')
const puppeteer = require('puppeteer')
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

//       Scenario: User sign ups sucessfully
Given('The browser is open on the signup page', async function() {
	await currentPage.goto(`http://${hostname}/signup`)
})

When('I fill in username with {string}', async function(user) {
	await currentPage.type('input[name=username]', user)
})

When('I fill in password with {string}', async function(pass) {
	await currentPage.type('input[name=password]', pass)
})

When('I fill in confirm password with {string}', async function(confirmPass) {
	await currentPage.type('input[name=confirmPassword]', confirmPass)
})

When('I press Sign Up', async function() {
	await currentPage.click('button[class=signup]')
})

Then('I should be redirected to {string} and signed in successfully', async function(page) {
	let currentURL = currentPage.url()
	assert(currentURL = `http://${hostname}/homepage`, `got ${currentURL}`)
})

//        Scenario: User provides invalid username  //

When('I fill in username with not {string}', async function(user) {


})
