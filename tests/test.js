#!/usr/bin/env node

'use strict'

/* This is the test script */

const { exec } = require('child_process')

let exitCode = 0

const handler = (error, stdout, stderr) => {
	if (error) {
		console.error(error)
		exitCode = 1
	}

	if (stderr) console.error(stderr)
	if (stdout) console.log(stdout)
}

console.log('Running Jest...')
exec(`${__dirname}/../node_modules/.bin/jest --runInBand --coverage`, handler)
	.on('close', () => {
		console.log('Running Cucumber...')
		exec(`${__dirname}/../node_modules/.bin/cucumber-js ./tests/features`, handler)
			.on('close', () => {
				process.exit(exitCode)
			})
	})

