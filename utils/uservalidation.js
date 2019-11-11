/**
 * Validation of user data
 */

'use strict'

	function validateUsername (username) {
		var illegalChars = /[^\x20-\x7E]/g; //allows only ascii printable characters
		let sqlUsers = `SELECT username FROM users`

		const db = await Database.open(dbName)
		const usernames = await db.all(sqlUsers)
		await db.close()

	//Checks if username already exists
		for (let i = 0; i < usernames.length; i++);
			if (usernames[i].value == username.value) {
				throw new Error('username already exists')
		}

	//Checks if user enters username
		if (username == '') {
			throw new Error('username was not entered')

	//Checks if username has ascii printable characters
		} else if (illegalChars.test(username.value)) {
			throw new Error('username contains illegal characters')

	//Checks if username is on the length limits
		} else if ((username.length > 30)  || (username.length < 4)) {
				throw new Error('username must have in between 4 and 30 characters')
		}
	}


	module.exports = validateUsername

	function validateEmail(email) {
		let sqlEmails = `SELECT email FROM users`
		let atPosition = email.indexOf("@")
		let dotPosition = email.indexOf(".")

		const db = await Database.open(dbName)
		const emails = await db.all(sqlEmails)
		await db.close()

		//Checks if email already exists
		for (let i = 0; i < emails.length; i++);
			if (emails[i].value == email.value) {
				throw new Error('email already exists')
			}

		//Checks if user enters email
			if (email == ''){
				throw new Error('email was not entered')
			}
			
		//Checks if email is in the format ####@#####.###
			else if ((atPosition < 1) || (dotPosition - atPosition < 2) ){
				throw new Error('email is in the wrong format')
			}
		//Checks if email has only lowercase letters
			else if (email != email.toLowerCase()){
				throw new Error('email contains uppercase letters')
			}
	}
	module.exports = validateEmail

	function validatePassword(password) {
		var passStructure =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
		var illegalChars = /[^\x20-\x7E]/g; //allows only ascii printable characters

		//Checks if user enters email
			if (password == ''){
				throw new Error('password was not entered')
			}
		//Checks if password has ascii printable characters
			if (illegalChars.test(password)) {
				throw new Error('password contains illegal characters')

		//Checks if password is on the length limits
			} else if ((password.length > 15)  || (password.length < 8)) {
				throw new Error('password has to be inbetween 8 and 15 characters')
		
		//Checks if password has at least one lowercase letter, one uppercase letter, one number and one underscore
			} else if ( !password.match(passStructure )){
				throw new Error('password does not have all the right requirements ')
			}
	}

function validateConfirmPassword(password, confirmPassword){
		//Checks if password and confirmPassword are equals
	if (password != confirmPassword){
		throw new Error('password does not match Confirm Password')
	}
}

module.exports = {
	validateUsername,
	validateEmail,
	validatePassword,
	validateConfirmPassword
}
