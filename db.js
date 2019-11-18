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
const Game = require('./models/game')

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
	async getGames() {
		throw new NotImplemented('getGames is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async getGame(id) {
		throw new NotImplemented('getGame is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async deleteGame(id) {
		throw new NotImplemented('deleteGame is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async createGame(game) {
		throw new NotImplemented('addGame is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async updateGame(game) {
		throw new NotImplemented('updateGame is not implemented')
	}

	async getCategories() {
		throw new NotImplemented('getCategories is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async getCategory(id) {
		throw new NotImplemented('getCategory is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async deleteCategory(id) {
		throw new NotImplemented('deleteCategory is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async createCategory(category) {
		throw new NotImplemented('createCategory is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async updateCategory(category) {
		throw new NotImplemented('updateCategory is not implemented')
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

	async getGames() {
		const sqlite = await this.sqlitePromise

		const games = await sqlite.all('SELECT * FROM `games`;')
		return games.map(x => Object.assign(new Game(), x))
	}

	async getGame(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'SELECT * FROM `games` WHERE `id` = ?;'
		} else {
			throw new TypeError('id must be a number')
		}

		const game = await sqlite.get(query, id)

		if (!game) {
			throw new EntityNotFound(`game with id ${id} not found`)
		}

		return Object.assign(new Game(), game)
	}

	async deleteGame(id) {
		// this will throw an error if game not found
		await this.getGame(id)

		const sqlite = await this.sqlitePromise
		let query

		if (typeof id === 'number') {
			query = 'DELETE FROM `games` WHERE `id` = ?;'
		} else {
			throw new TypeError('must be number or string')
		}

		await sqlite.run(query, id)
	}

	async updateGame(game) {
		// throws errors if entities are nonexistent
		await this.getGame(game.id)
		await this.getUser(game.submittedBy)

		const sqlite = await this.sqlitePromise

		await sqlite.run(
			'UPDATE `games` SET ' +
			'`title` = ?, `summary` = ?, `imageSrc` = ?, ' +
			'`rating` = ?, `submittedBy` = ? WHERE `id` = ?;',
			game.title,
			game.summary,
			game.imageSrc,
			game.rating,
			game.submittedBy,
			game.id
		)
		return this.getGame(game.id)
	}

	async createGame(game) {
		const sqlite = await this.sqlitePromise

		const { lastID } = await sqlite.run(
			'INSERT INTO `games` ' +
			'(`title`, `summary`, `imageSrc`, ' +
			' `rating`, `submittedBy`) ' +
			'VALUES (?, ?, ?, ?, ?);',
			game.title,
			game.summary,
			game.imageSrc,
			game.rating,
			game.submittedBy,
		)

		return this.getGame(lastID)
	}
}

module.exports = {
	DbContext,
	SqliteDbContext
}
