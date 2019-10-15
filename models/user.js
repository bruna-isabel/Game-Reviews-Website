'use strict'

class User {
	constructor(username, hash) {
		this.id = -1
		this.username = username
		this.hash = hash
	}
}

module.exports = User
