/*
 * Database controller
 */

'use strict'

const sqlite = require('sqlite')

const {
	NotImplemented,
	EntityNotFound
} = require('./utils/errors')

const User = require('./models/user')

class DbContext {
	async getUsers() {
		throw new NotImplemented('getUsers is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async getUser(id) {
		throw new NotImplemented('getUser is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async deleteUser(id) {
		throw new NotImplemented('deleteUser is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async createUser(user) {
		throw new NotImplemented('createUser is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async updateUser(user) {
		throw new NotImplemented('updateUser is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async execute(query) {
		throw new NotImplemented('execute is not implemented')
	}
}

class SqliteDbContext extends DbContext {
	constructor(filename) {
		super()

		this.sqlitePromise = sqlite.open(filename, { Promise })
	}

	async getUser(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'SELECT * FROM `users` WHERE `id` = ?;'
		} else if (typeof id === 'string') {
			query = 'SELECT * FROM `users` WHERE `username` = ?;'
		} else {
			throw new TypeError('id must be number or string')
		}

		const user = await sqlite.get(query, id)
		if (!user) {
			throw new EntityNotFound(`user with id ${id} not found`)
		}

		return Object.assign(new User(), user)
	}

	async getUsers() {
		const sqlite = await this.sqlitePromise

		const users = await sqlite.all('SELECT * FROM `users`;')
		return users.map(x => Object.assign(new User(), x))
	}

	async deleteUser(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'DELETE FROM `users` WHERE `id` = ?;'
		} else if (typeof id === 'string') {
			query = 'DELETE FROM `users` WHERE `username` = ?;'
		} else {
			throw new TypeError('id must be number or string')
		}

		await sqlite.run(query, id)
	}

	async createUser(user) {
		const sqlite = await this.sqlitePromise

		const { lastID } = await sqlite.run(
			'INSERT INTO `users` (`username`, `hash`) VALUES (?, ?);',
			user.username,
			user.hash
		)
		return this.getUser(lastID)
	}

	async updateUser(user) {
		const sqlite = await this.sqlitePromise

		await sqlite.run(
			'UPDATE `users` SET `username` = ?, `hash` = ? WHERE `id` = ?;',
			user.username,
			user.hash,
			user.id
		)
		return this.getUser(user.id)
	}
}

module.exports = {
	DbContext,
	SqliteDbContext
}
