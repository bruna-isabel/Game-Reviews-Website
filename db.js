/*
 * Database controller
 */

'use strict'

const sqlite = require('sqlite')

const { NotImplemented } = require('./utils/errors')
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
	async execute(query) {
		throw new NotImplemented('execute is not implemented')
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
		throw new NotImplemented('removeGame is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async addGame(game) {
		throw new NotImplemented('addGame is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async updateGame(game) {
		throw new NotImplemented('updateGame is not implemented')
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
		return games
		//ask dec about what the hell his code returns
	}

	async getGame(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'SELECT * FROM `games` WHERE `gameID` = ?;'
		} else if (typeof id === 'string') {
			query = 'SELECT * FROM `games` WHERE `title` = ?;'
		} else {
			throw new TypeError('must be a number or a string')
		}

		const game = await sqlite.get(query, id)
		return Object.assign(new Game(), game)
	}

	async deleteGame(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'DELETE FROM `games` WHERE `gameID` = ?;'
		} else if (typeof id === 'string') {
			query = 'DELETE FROM `games` WHERE `title` = ?;'
		} else {
			throw new TypeError('must be number or string')
		}

		await sqlite.run(query, id)
	}

	async updateGame(game) {
		const sqlite = await this.sqlitePromise

		await sqlite.run(
			'UPDATE `games` SET `title`= ? , `summary`= ? , `imageSrc`= ? , `rating`= ? , `submittedBy`= ?, `approved` = ? WHERE `gameID`= ? ;',
			game.title,
			game.summary,
			game.imageSrc,
			game.rating,
			game.submittedBy,
			game.approved,
			game.gameID
		)
		return this.getGame(game.gameID)
	}

	async addGame(game) {
		//TEST THIS METHOD
		const sqlite = await this.sqlitePromise

		await sqlite.run(
			'INSERT INTO `games` VALUES `title`=?,`summary`=?,`imageSrc`=?,`rating`=?,`submittedBy`=?,`approved`=`no`;',
			game.title,
			game.summary,
			game.imageSrc,
			game.rating,
			game.submittedBy,
			game.gameID
		)
		const newGame = 'SELECT * FROM `games` ORDER BY `gameID` DESC LIMIT 1;'
		return Object.assign(new Game(), newGame)
	}
}

module.exports = {
	DbContext,
	SqliteDbContext
}
