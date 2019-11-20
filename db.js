/*
 * Database controller
 */

'use strict'

const sqlite = require('sqlite')

const { NotImplemented } = require('./utils/errors')
const User = require('./models/user')
const Game = require('./models/game')
const Review = require('./models/review')

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

	// eslint-disable-next-line no-unused-vars
	async getReviews() {
		throw new NotImplemented('getReviews is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async getReview(id) {
		throw new NotImplemented('getReview is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async deleteReview(id) {
		throw new NotImplemented('deleteReview is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async createReview(review) {
		throw new NotImplemented('createReview is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async updateReview(review) {
		throw new NotImplemented('updateReview is not implemented')
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
		return user ? Object.assign(new User(), user) : null
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
		} else {
			throw new TypeError('must be a number')
		}

		const game = await sqlite.get(query, id)
		return Object.assign(new Game(), game)
	}

	async deleteGame(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'DELETE FROM `games` WHERE `gameID` = ?;'
		} else {
			throw new TypeError('must be number')
		}

		await sqlite.run(query, id)
	}

	async updateGame(game) {
		const sqlite = await this.sqlitePromise
		await sqlite.run(
			'UPDATE `games` SET `title`= ? , `slugline` = ?, `summary`= ? , `releaseDate`=?, `director`=?, `publisher`=?, `rating`= ? , `submittedBy`= ?, `approved` = ?, `poster`=?, `splash`=? WHERE `gameID`= ? ;',
			game.title,
			game.slugline,
			game.summary,
			game.releaseDate,
			game.director,
			game.publisher,
			game.rating,
			game.submittedBy,
			game.approved,
			game.poster,
			game.slugline,
			game.gameID
		)
		return this.getGame(game.gameID)
	}

	async addGame(game) {
		const sqlite = await this.sqlitePromise

		await sqlite.run(
			'INSERT INTO `games` VALUES `title`= ? , `slugline` = ?, `summary`= ? , `releaseDate`=?, , `director`=?, `publisher`=?, `rating`= ? , `submittedBy`= ?, `approved` = `no`, `poster`=?, `splash`=?;',
			game.title,
			game.slugline,
			game.summary,
			game.releaseDate,
			game.director,
			game.publisher,
			game.rating,
			game.submittedBy,
			game.poster,
			game.slugline
		)
		const newGame = 'SELECT * FROM `games` ORDER BY `gameID` DESC LIMIT 1;'
		return Object.assign(new Game(), newGame)
	}

	async getReviews() {
		const sqlite = await this.sqlitePromise

		const reviews = await sqlite.all('SELECT * FROM `reviews`;')
		return reviews
	}

	async getReview(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'SELECT * FROM `reviews` WHERE `id` = ?;'
		} else {
			throw new TypeError('must be a number')
		}

		const review = await sqlite.get(query, id)
		return Object.assign(new Review(), review)
	}

	async deleteReview(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'DELETE FROM `reviews` WHERE `id` = ?;'
		} else {
			throw new TypeError('must be a number')
		}

		await sqlite.run(query, id)
	}

	async createReview(review) {
		const sqlite = await this.sqlitePromise
		const d = new Date();
		const month = Number(d.getMonth()+1)
		const currentDate = "" + d.getDate() + '/' + month + '/' + d.getFullYear() + "";

		await sqlite.run(
			'INSERT INTO `reviews`(`user`, `game`, `review_score`, `review_text`, `review_date`, `approved`) VALUES(?,?,?,?,?,?)',
			'USER_NAME',
			review.gameName,
			review.starRating,
			review.rvtext,
			currentDate,
			'no'
		)
	}

	async updateReview(review) {
		const sqlite = await this.sqlitePromise

		await sqlite.run(
			'UPDATE `reviews` SET `user`=?, `game`=?, `review_score`=?, `review_text`=?, `review_date`=?, `approved`=? WHERE `id`=?;',
			review.user,
			review.game,
			review.review_score,
			review.review_text,
			review.review_date,
			review.approved,
			review.id
		)
		return this.getReview(review.id)
	}
}

module.exports = {
	DbContext,
	SqliteDbContext
}
