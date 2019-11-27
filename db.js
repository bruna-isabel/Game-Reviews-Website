/*Database controller*/

'use strict'

const sqlite = require('sqlite')

const { NotImplemented } = require('./utils/errors')
const User = require('./models/user')
const Game = require('./models/game')
const Review = require('./models/review')
const Platform = require('./models/platform')


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
	async isUserAdmin(id) {
		throw new NotImplemented('isUserAdmin is not implemented')
	}
	// eslint-disable-next-line no-unused-vars
	async execute(query) {
		throw new NotImplemented('execute is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async users_games() {
		throw new NotImplemented('users_games is not implemented')
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
	async getAvgScore(id) {
		throw new NotImplemented('getAvgScore is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async getPlatforms() {
		throw new NotImplemented('getPlatforms is not implemented')
	}
	async approvalGameList(bool) {
		throw new NotImplemented('approvalGameList is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async getReviews() {
		throw new NotImplemented('getReviews is not implemented')
	}
	// eslint-disable-next-line no-unused-vars
	async getReviewsForGame() {
		throw new NotImplemented('getReviewsForGame is not implemented')
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

	// eslint-disable-next-line no-unused-vars
	async approvalReviewList(bool) {
		throw new NotImplemented('approvalReviewList is not implemented')
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

	async isUserAdmin(id) {
		const user = await this.getUser(id)
		if(user['isAdmin'] === 'yes') {
			return true
		} else {
			return false
		}
	}

	// eslint-disable-next-line camelcase
	async users_games() {
		const sqlite = await this.sqlitePromise

		const linkedTable = await sqlite.all('SELECT `users`.`id`, `users`.`username`, `games`.`gameID`, `games`.`title` FROM `games` INNER JOIN `users` ON `users`.`id` = `games`.`submittedBy`;')
		return linkedTable
	}

	async getGames() {
		const sqlite = await this.sqlitePromise

		const games = await sqlite.all('SELECT * FROM `games`;')
		return games
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
			'UPDATE `games` SET `title`= ? , `platforms`=?, `slugline` = ?, `summary`= ? , `releaseDate`=?, `developer`=?, `publisher`=?, `submittedBy`= ?, `approved` = ?, `poster`=?, `splash`=? WHERE `gameID`= ? ;',
			game.title,
			game.platforms,
			game.slugline,
			game.summary,
			game.releaseDate,
			game.developer,
			game.publisher,
			game.submittedBy,
			game.approved,
			game.poster,
			game.splash,
			game.gameID
		)
		return this.getGame(game.gameID)
	}

	async addGame(game) {
		const sqlite = await this.sqlitePromise

		await sqlite.run(
			'INSERT INTO `games` (`title`, `platforms`, `slugline`, `summary`, `releaseDate`, `developer`, `publisher`, `submittedBy`, `approved`, `poster`, `splash`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)' ,
			game.title,
			game.platforms,
			game.slugline,
			game.summary,
			game.releaseDate,
			game.developer,
			game.publisher,
			game.submittedBy,
			game.approved,
			game.poster,
			game.splash
		)
		const newGame = 'SELECT * FROM `games` ORDER BY `gameID` DESC LIMIT 1;'
		return Object.assign(new Game(), newGame)
	}

	async getAvgScore(id, reviewCount) {
		if (reviewCount === 0) {
			return 0
		}
		const sqlite = await this.sqlitePromise

		let allScoresForGame = [];
		let totalOfScores = 0;
		allScoresForGame = await sqlite.all('SELECT `review_score` FROM `reviews` WHERE `game` = ?;', id)
		for (let i = 0; i < allScoresForGame.length; i++) {
			totalOfScores += allScoresForGame[i].review_score
		}
		const averageReviewScore = totalOfScores/allScoresForGame.length
		let score = +averageReviewScore.toFixed(2)
		if(isNaN(score)) { //in case there are no reviews
			score = 0
		}
		return score
	}
	async getPlatforms(platformIDs) {
		const sqlite = await this.sqlitePromise

		const platforms = []
		for (let i = 0; i < platformIDs.length; i++) {
			platforms.push(await sqlite.get('SELECT `name` FROM `platforms` WHERE `id` = ?;', platformIDs[i]))
		}

		return platforms
	}
	async approvalGameList(bool) {
		const sqlite = await this.sqlitePromise

		let query

		if(bool === true) {
			 query = 'SELECT * FROM `games` WHERE `approved` = ?'
		} else if(bool ===false) {
			 query = 'SELECT * FROM `games` WHERE `approved` != ?'
		}
		const games = await sqlite.all(query, 'yes')
		return games
	}

	async getAllPlatforms() {
		const sqlite = await this.sqlitePromise
		const names = await sqlite.all('SELECT * FROM `platforms`; ')
		return names
	}
	async getReviews() {
		const sqlite = await this.sqlitePromise

		const reviews = await sqlite.all('SELECT * FROM `reviews`;')
		return reviews
	}

	async getReviewsForGame(gameID) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof gameID === 'number') {
			query = 'SELECT * FROM `reviews` WHERE `game` = ? AND `approved` = ?;'
		} else {
			throw new TypeError('must be a number')
		}

		const reviews = await sqlite.all(query, gameID, 'yes')
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
		const currentDate = `${d.getDate()}/${month}/${d.getFullYear()}`

		await sqlite.run(
			'INSERT INTO `reviews`(`user`, `game`, `review_score`, `review_text`, `review_date`, `approved`) VALUES(?,?,?,?,?,?)',
			review.user,
			review.game,
			review.review_score,
			review.review_text,
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

	async approvalReviewList(bool) {
		const sqlite = await this.sqlitePromise

		let query

		if(bool === true) {
			 query = 'SELECT * FROM `reviews` WHERE `approved` = ?'
		} else if(bool ===false) {
			 query = 'SELECT * FROM `reviews` WHERE `approved` != ?'
		}
		const reviews = await sqlite.all(query, 'yes')
		return reviews
	}
}

module.exports = {
	DbContext,
	SqliteDbContext
}
