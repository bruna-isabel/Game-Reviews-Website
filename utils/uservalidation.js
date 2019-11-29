/**
 * Validation of user data
 */

'use strict'

const MAX_LENGTH_USER = 30
const MIN_LENGTH_USER = 4
const MAX_LENGTH_PASS = 15
const MIN_LENGHT_PASS = 8

function validateUsername(username) {
	const illegalChars = /[^\x20-\x7E]/g //allows only ascii printable characters

	//Checks if user enters username
	if (username === '') {
		throw new Error('username was not entered')

	//Checks if username has ascii printable characters
	} else if (illegalChars.test(username)) {
		throw new Error('username contains illegal characters')

	//Checks if username is on the length limits
	} else if (username.length > MAX_LENGTH_USER || username.length < MIN_LENGTH_USER) {
		throw new Error('username must have in between 4 and 30 characters')
	}
	console.log('valid username')
	return true
}

// eslint-disable-next-line complexity
function validatePassword(password) {
	const passStructure = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
	const illegalChars = /[^\x20-\x7E]/g //allows only ascii printable characters
	//Checks if user enters email
	if (password === '') {
		throw new Error('password was not entered')
	}
	//Checks if password has ascii printable characters
	if (illegalChars.test(password)) {
		throw new Error('password contains illegal characters')
	//Checks if password is on the length limits
	} else if (password.length > MAX_LENGTH_PASS || password.length < MIN_LENGHT_PASS) {
		throw new Error('password has to be inbetween 8 and 15 characters')
	//Checks if password has at least one lowercase letter, one uppercase letter, one number and one underscore
	} else if ( !password.match(passStructure)) {
		throw new Error('password does not have all the right requirements ')
	}
	console.log('valid password')
	return true
}

function validateConfirmPassword(password, confirmPassword) {
	//Checks if password and confirmPassword are equals
	if (password !== confirmPassword) {
		throw new Error('password does not match Confirm Password')
	}
	console.log('valid confirm password')
	return true
}

module.exports = {
	validateUsername,
	validatePassword,
	validateConfirmPassword
}
