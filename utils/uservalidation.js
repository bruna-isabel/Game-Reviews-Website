/**
 * Validation of user data
 */

'use strict'
//const sqlite = require('sqlite')
const MAX_LENGTH_USER = 30
const MIN_LENGTH_USER = 4
const MAX_LENGTH_PASS = 15
const MIN_LENGHT_PASS = 8

const PASS_STRUCTURE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
const ILLEGAL_CHARS = /[^\x20-\x7E]/g //allows only ascii printable characters

function validateUsername(username) {
	//Checks if user enters username
	if (username === '') {
		throw new Error('username was not entered')

	//Checks if username has ascii printable characters
	} else if (ILLEGAL_CHARS.test(username)) {
		throw new Error('username contains illegal characters')

	//Checks if username is on the length limits
	} else if (username.length > MAX_LENGTH_USER || username.length < MIN_LENGTH_USER) {
		throw new Error('username must have in between 4 and 30 characters')
	}
	return true
}

// eslint-disable-next-line complexity
function validatePassword(password) {
	//Checks if user enters email
	if (!password) {
		throw new Error('password was not entered')
	}

	//Checks if password has ascii printable characters
	if (ILLEGAL_CHARS.test(password)) {
		throw new Error('password contains illegal characters')

	//Checks if password is on the length limits
	} else if (password.length > MAX_LENGTH_PASS || password.length < MIN_LENGHT_PASS) {
		throw new Error('password has to be inbetween 8 and 15 characters')

	//Checks if password has at least one lowercase letter, one uppercase letter, one number and one underscore
	} else if (!password.match(PASS_STRUCTURE)) {
		throw new Error('password does not have all the right requirements ')
	}
	return true
}

function validateConfirmPassword(password, confirmPassword) {
	//Checks if password and confirmPassword are equals
	if (password !== confirmPassword) {
		throw new Error('password does not match Confirm Password')
	}
	return true
}

module.exports = {
	validateUsername,
	validatePassword,
	validateConfirmPassword
}
