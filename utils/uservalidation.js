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
		for (let i = 0; i < usernames.value.length; i++);
			if (usernames[i].value == username.value) {
				throw new Error('username already exists')
		}

	//Checks if user enters username
		if (username.value == " ") {
			throw new Error('username was not entered')

	//Checks if username has ascii printable characters
		} else if (username.value.match(illegalChars)) {
			throw new Error('username contains illegal characters')

	//Checks if username is on the length limits
		} else if ((username.value.lenght > 30)  || (username.value.length < 4)) {
				throw new Error('username must have in between 4 and 30 characters')
		}
	}

	module.exports = validateUsername

	function validateEmail(email) {
		let sqlEmails = `SELECT email FROM users`
		let atPosition = value.indexOf("@")
		let dotPosition = value.indexOf(".")

		const db = await Database.open(dbName)
		const emails = await db.all(sqlEmails)
		await db.close()

		//Checks if email already exists
		for (let i = 0; i < emails.value.length; i++);
			if (emails[i].value == email.value) {
				throw new Error('email already exists')
			}

		//Checks if user enters email
			else if (email.value == " "){
				throw new Error('email was not entered')
			}
			
		//Checks if email is in the format ####@#####.###
			else if ((atPosition < 1) || (dotPosition - atPosition < 2) ){
				throw new Error('email is in the wrong format')
			}
		//Checks if email has only lowercase letters
			else if (email.value != email.value.toLowerCase()){
				throw new Error('email does not have uppercase letters')
			}
	}
	module.exports = validateEmail

	function validatePassword(password) {

		//Checks if user enters password
			if (password.value == " " || confirmPassword == " "){
				throw new Error('password or confirm password were not entered')

		//Checks if password has ascii printable characters
			} else if (password.value.match(illegalChars)) {
				throw new Error('password contains illegal characters')

		//Checks if password is on the length limits
			} else if ((password.value.lenght > 15)  || (password.value.length < 8)) {
				throw new Error('password has to be inbetween 8 and 15 characters')
		
		//Checks if password has at least one lowercase letter, one uppercase letter, one number and one symbol
			} else if ((password.value.search((/[a-zA-Z])+/) == -1)) || (password.value.search((/\d/)==-1)) || (password.value.search((/[ -~]/)==-1))){
				throw new Error('password does not have all the right requirements ')

		//Checks if password and confirmPassword are equals
			} else if (password.value !== confirmPassword.value){
					throw new Error('password does not match Confirm Password')
			
			}
	}

	function validateConfirmPassoword(confirmPassword){

		//Checks if user enters password
		if (confirmPassword == " "){
			throw new Error('confirm password were not entered')
	
		//Checks if password and confirmPassword are equals
		} else if (password.value !== confirmPassword.value){
			throw new Error('password does not match Confirm Password')
		}
}
	module.exports = validatePassword
	module.exports = validateConfirmPassword

