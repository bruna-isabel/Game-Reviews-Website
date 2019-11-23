'use strict'

class User {
	constructor(username, hash, isAdmin) {
		this.id = -1
		this.username = username
		this.hash = hash
		this.isAdmin = isAdmin
	}
}

module.exports = User
