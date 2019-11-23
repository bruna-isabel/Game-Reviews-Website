'use strict'
const bcrypt = require('bcrypt')
const DEFAULT_ROUNDS = 12

class User {
	constructor(username, hash) {
		this.id = -1
		this.username = username
		this.hash = hash
	}

	static async createFromPlainText(username, password, rounds = DEFAULT_ROUNDS) {
		const hash = await bcrypt.hash(password, rounds)
		return new User(username, hash)
	}

	async changePassword(password, rounds = DEFAULT_ROUNDS) {
		const hash = await bcrypt(password, rounds)
		this.hash = hash
	}
}


module.exports = User
