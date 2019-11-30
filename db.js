/* eslint-disable max-lines */
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
const Category = require('./models/category')
const Review = require('./models/review')
const Platform = require('./models/platform')


/**
 * Abstract class for connecting to site database.
 * @abstract
 */
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
	async usersGames() {
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
		throw new NotImplemented('deleteGame is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async createGame(game) {
		throw new NotImplemented('addGame is not implemented')
	}

	/**
	 * Updates a Game.
	 * @abstract
	 * @param {Game} game - Game to be updated
	 * @returns {Promise<Game>} Updated version of the game
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async updateGame(game) {
		throw new NotImplemented('updateGame is not implemented')
	}

	/**
	 * Gets all Categories.
	 * @abstract
	 * @returns {Promise<Category[]>}
	 * @throws {NotImplemented}
	 */
	async getCategories() {
		throw new NotImplemented('getCategories is not implemented')
	}

	/**
	 * Gets a Category by ID or Name.
	 * @abstract
	 * @param {number|string} id - ID or Name of the Category
	 * @returns {Promise<Category>}
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async getCategory(id) {
		throw new NotImplemented('getCategory is not implemented')
	}

	/**
	 * Deletes a Category.
	 * @abstract
	 * @param {number} id - ID of the Category
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async deleteCategory(id) {
		throw new NotImplemented('deleteCategory is not implemented')
	}

	/**
	 * Creates a new Category.
	 * @abstract
	 * @param {Category} category - Category to be added to the database
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async createCategory(category) {
		throw new NotImplemented('createCategory is not implemented')
	}

	/**
	 * Updates a Category.
	 * @abstract
	 * @param {Category} category - Category being modified
	 * @returns {Promise<Category>} The updated Category
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async updateCategory(category) {
		throw new NotImplemented('updateCategory is not implemented')
	}

	/**
	 * Gets Categories for a given game ID.
	 * @abstract
	 * @param {Number} gameID - ID of the game
	 * @returns {Promise<Category[]>} An array of categories
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async getGameCategories(gameID) {
		throw new NotImplemented('getGameCatergories is not implemented')
	}

	/**
	 * Links a Category to a Game.
	 * @abstract
	 * @param {Game} game - The Game being linked to
	 * @param {Category} category - The Category being linked
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async linkGameCategory(game, category) {
		throw new NotImplemented('linkGameCategory is not implemented')
	}

	/**
	 * Creates a new Category if it doesn't exist and links
	 * it to a Game.
	 * @abstract
	 * @param {Game} game - Game being linked to
	 * @param {Category} category - Category being linked
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async createAndLinkGameCategory(game, category) {
		throw new NotImplemented('createAndLinkGameCategory is not implemented')
	}

	/**
	 * Gets a Platform by a given ID.
	 * @abstract
	 * @param {number|string} id - ID of the Platform
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async getPlatform(id) {
		throw new NotImplemented('getPlatform is not implemented')
	}

	/**
	 * Creates a new Platform.
	 * @abstract
	 * @param {Platform} platform - Platform being created
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async createPlatform(platform) {
		throw new NotImplemented('createPlatform is not implemented')
	}

	/**
	 * Links a Game and a Platform.
	 * @abstract
	 * @param {Game} game - The Game being linked
	 * @param {Platform} platform - The Platform being linked
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async linkGamePlatform(game, platform) {
		throw new NotImplemented('linkGamePlatform is not implemented')
	}

	/**
	 * Creates a new Platform if it doesn't exist and links
	 * it to a Game.
	 * @abstract
	 * @param {Game} game - Game being linked to
	 * @param {Platform} platform - Platform being linked
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async createAndLinkGamePlatform(game, platform) {
		throw new NotImplemented('createAndLinkGamePlatform is not implemented')
	}

	/**
	 * Gets the Platforms for a given Game.
	 * @abstract
	 * @param {number} gameID - ID of the game
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async getGamePlatforms(gameID) {
		throw new NotImplemented('getGamePlatforms is not implemented')
	}

	/**
	 * Executes an arbitrary query
	 * @abstract
	 * @param {string} query - SQL query being executed
	 * @throws {NotImplemented}
	 */
	// eslint-disable-next-line no-unused-vars
	async execute(query) {
		throw new NotImplemented('execute is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async getAvgScore(id) {
		throw new NotImplemented('getAvgScore is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
	async getPlatforms() {
		throw new NotImplemented('getPlatforms is not implemented')
	}

	// eslint-disable-next-line no-unused-vars
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
	constructor(filename = '') {
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

	async isUserAdmin(id) {
		const user = await this.getUser(id)
		if(user['isAdmin'] === 'yes') {
			return true
		} else {
			return false
		}
	}

	// eslint-disable-next-line camelcase
	async usersGames() {
		const sqlite = await this.sqlitePromise

		const linkedTable = await sqlite.all('SELECT `users`.`id`, `users`.`username`, `games`.`gameID`, `games`.`title` FROM `games` INNER JOIN `users` ON `users`.`id` = `games`.`submittedBy`;')
		return linkedTable
	}

	async getGames() {
		const sqlite = await this.sqlitePromise

		const games = await sqlite.all('SELECT * FROM `games`;')
		return games.map(x => Object.assign(new Game(), x))
	}

	// eslint-disable-next-line max-lines-per-function
	async getGame(id) {
		const sqlite = await this.sqlitePromise

		let query

		if (typeof id === 'number') {
			query = 'SELECT * FROM `games` WHERE `id` = ?;'
		} else {
			throw new TypeError('id must be a number')
		}

		let game = await sqlite.get(query, id)
		if (!game) {
			throw new EntityNotFound(`game with id ${id} not found`)
		}

		// downcasr result as Game object
		game = Object.assign(new Game(), game)
		game.categories = await this._getGameCategories(id)
		game.platforms = await this._getGamePlatforms(id)

		return game
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

	/**
	 * @param {Game} game - Game to be updated
	 * @returns {Promise<Game>} Updated version of game
	 * @throws {EntityNotFound} Game, User, or Category not found
	 */
	// eslint-disable-next-line max-lines-per-function
	async updateGame(game) {
		// throws errors if entities are nonexistent
		await this.getGame(game.id)
		await this.getUser(game.submittedBy)

		const sqlite = await this.sqlitePromise
		await sqlite.run(
			'UPDATE `games` SET ' +
			'`title` = ?, `summary` = ?, `slugline` = ?, ' +
			'`releaseDate` = ?, `submittedBy` = ?, `developer` = ?, ' +
			'`publisher` = ?, `approved` = ?, `poster` = ?, `splash` = ? ' +
			'WHERE `id` = ?;',
			game.title,
			game.summary,
			game.slugline,
			game.releaseDate,
			game.submittedBy,
			game.developer,
			game.publisher,
			game.approved,
			game.poster,
			game.splash,
			game.id
		)

		// link each category
		for (const category of game.categories) {
			await this.createAndLinkGameCategory(game, category)
		}

		//link each platform
		for (const platform of game.platforms) {
			await this.createAndLinkGamePlatform(game, platform)
		}

		return this.getGame(game.id)
	}

	/**
	 * @param {Game} game - Game to be added to the database
	 * @returns {Promise<Game>}
	 */
	// eslint-disable-next-line max-lines-per-function
	async createGame(game) {
		const sqlite = await this.sqlitePromise

		const { lastID } = await sqlite.run(
			'INSERT INTO `games` ' +
			'(`title`, `slugline`, `summary`, ' +
			' `releaseDate`, `developer`, `publisher`, ' +
			' `submittedBy`, `approved`, `poster`, `splash`) ' +
			'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
			game.title,
			game.slugline,
			game.summary,
			game.releaseDate,
			game.developer,
			game.publisher,
			game.submittedBy,
			'no',
			game.poster,
			game.splash
		)

		// update game id after insert
		game.id = lastID
		// link each category
		for (const category of game.categories) {
			await this.createAndLinkGameCategory(game, category)
		}
		//link each platform
		for (const platform of game.platforms) {
			await this.createAndLinkGamePlatform(game, platform)
		}

		return this.getGame(lastID)
	}

	/**
	 * @param {number|string} id - Name or ID of the Category
	 * @returns {Promise<Category>}
	 * @throws {EntityNotFound} Category not found
	 * @throws {TypeError} ID must be string or number
	 */
	async getCategory(id) {
		const sqlite = await this.sqlitePromise

		let query
		if (typeof id === 'number') {
			query = 'SELECT * FROM `categories` WHERE id = ?;'
		} else if (typeof id === 'string') {
			query = 'SELECT * FROM `categories` WHERE name = ?;'
		} else {
			throw new TypeError('id must be number or string')
		}

		const category = await sqlite.get(query, id)
		if (!category) {
			throw new EntityNotFound(`category with id ${id} not found`)
		}

		return Object.assign(new Category(), category)
	}

	/**
	 * @param {Category} category - Category being created
	 * @returns {Promise<Category>}
	 */
	async createCategory(category) {
		const sqlite = await this.sqlitePromise

		const { lastID } = await sqlite.run(
			'INSERT INTO `categories` (`name`) VALUES (?);',
			category.name
		)

		return this.getCategory(lastID)
	}

	/**
	 * @param {number} gameID - ID of the Game
	 * @returns {Promise<Category[]>} List of Categories for the given Game
	 * @throws {EntityNotFound} Game could not be found
	 */
	async getGameCategories(gameID) {
		// checks if game exists
		await this.getGame(gameID)

		// call method without check
		return this._getGameCategories(gameID)
	}

	/**
	 * @param {Game} game - The Game being linked
	 * @param {Category} category - The Category being linked
	 * @throws {EntityNotFound} Game or category not found
	 */
	async linkGameCategory(game, category) {
		// validate
		await this.getGame(game.id)
		await this.getCategory(category.id)

		const alreadyLinked = await this.getGameCategories(game.id)
		const isLinked = alreadyLinked.some(c => c.id === category.id)

		// link if category is not already linked to this game
		if (!isLinked) {
			await sqlite.run(
				'INSERT INTO `gameCategories` VALUES (?, ?)',
				game.id,
				category.id
			)
		}
	}

	/**
	 * @param {Game} game - Game being linked to
	 * @param {Category} category - Category being linked
	 * @throws {EntityNotFound} Game not found
	 */
	async createAndLinkGameCategory(game, category) {
		// validate
		await this.getGame(game.id)

		try {
			await this.getCategory(category.id)
		} catch (e) {
			// if missing, create new
			if (e instanceof EntityNotFound) {
				category = await this.createCategory(category)
			} else {
				throw e
			}
		}

		await this.linkGameCategory(game, category)
	}

	/**
	 * Gets a list of Categories for a given Game ID, skips the game check.
	 * @protected
	 * @param {number} gameID - ID of the Game
	 * @return {Promise<Category[]>}
	 */
	async _getGameCategories(gameID) {
		const sqlite = await this.sqlitePromise

		const categories = await sqlite.all(
			'SELECT `c`.`id`, `c`.`name` FROM `gameCategories` AS `gc` ' +
			'INNER JOIN `categories` AS `c` ON `gc`.`categoryID` = `c`.`id` ' +
			'WHERE `gameID` = ?',
			gameID
		)

		return categories.map(x => Object.assign(new Category(), x))
	}

	/**
	 * @param {number|string} id - ID of the Platform
	 * @throws {TypeError} ID must be a number or string
	 * @throws {EntityNotFound} Platform not found
	 * @returns {Promise<Platform>}
	 */
	async getPlatform(id) {
		const sqlite = await this.sqlitePromise

		let query
		if (typeof id === 'number') {
			query = 'SELECT * FROM `platforms` WHERE `id` = ?;'
		} else if (typeof id === 'string') {
			query = 'SELECT * FROM `platforms` WHERE `name` = ?;'
		} else {
			throw new TypeError('id must be number or string')
		}

		const platform = await sqlite.get(query, id)
		if (!platform) {
			throw new EntityNotFound(`platform with id ${id} not found`)
		}

		return Object.assign(new Platform(), platform)
	}

	/**
	 * @param {Platform} platform - Platform being created
	 * @returns {Promise<Platform>}
	 */
	async createPlatform(platform) {
		const sqlite = await this.sqlitePromise

		const { lastID } = await sqlite.run(
			'INSERT INTO `platforms` (`name`) VALUES (?);',
			platform.name
		)
		return this.getPlatform(lastID)
	}

	/**
	 * @param {number} gameID - ID of the Game
	 * @throws {EntityNotFound} Game not found
	 */
	async getGamePlatforms(gameID) {
		await this.getGame(gameID)

		return this._getGamePlatforms(gameID)
	}

	/**
	 * Gets a list of Platforms for a given Game ID, skips check
	 * @protected
	 * @param {number} gameID - ID of the Game
	 * @returns {Promise<Platform[]>}
	 */
	async _getGamePlatforms(gameID) {
		const sqlite = await this.sqlitePromise

		const platforms = await sqlite.all(
			'SELECT `p`.`id`, `p`.`name` FROM `gamePlatforms` AS `gp` ' +
			'INNER JOIN `platforms` AS `p` ON `gp`.`platformID` = `p`.`id` ' +
			'WHERE `gameID` = ?',
			gameID
		)

		return platforms.map(x => Object.assign(new Platform(), x))
	}

	/**
	 * @param {Game} game - The Game being linked
	 * @param {Platform} platform - The Platform being linked
	 * @throws {EntityNotFound} Game or platform not found
	 */
	async linkGamePlatform(game, platform) {
		// validate
		await this.getGame(game.id)
		await this.getPlatform(platform.id)

		const alreadyLinked = await this.getGamePlatforms(game.id)
		const isLinked = alreadyLinked.some(c => c.id === platform.id)

		// link if category is not already linked to this game
		if (!isLinked) {
			await sqlite.run(
				'INSERT INTO `gamePlatforms` VALUES (?, ?)',
				game.id,
				platform.id
			)
		}
	}

	/**
	 * @param {Game} game - Game being linked to
	 * @param {Platform} platform - Platform being linked
	 * @throws {EntityNotFound} Game not found
	 */
	async createAndLinkGamePlatform(game, platform) {
		// validate
		await this.getGame(game.id)

		try {
			await this.getPlatform(platform.id)
		} catch (e) {
			// if missing, create new
			if (e instanceof EntityNotFound) {
				platform = await this.createPlatform(platform)
			} else {
				throw e
			}
		}

		await this.linkGamePlatform(game, platform)
	}

	async getAvgScore(id) {
		const sqlite = await this.sqlitePromise

		let allScoresForGame = [];
		let totalOfScores = 0;
		allScoresForGame = await sqlite.all('SELECT `review_score` FROM `reviews` WHERE `game` = ?;', id)
		for (let i = 0; i < allScoresForGame.length; i++) {
			totalOfScores += allScoresForGame[i].review_score
		}

		const averageReviewScore = totalOfScores/allScoresForGame.length
		return +averageReviewScore.toFixed(2)
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

	async addPlatforms(platform) {
		const sqlite = await this.aqlitePromise
		await sqlite.run(
			'INSERT INTO `games` VALUES `platforms` = ?',
			platform.id
		)
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
