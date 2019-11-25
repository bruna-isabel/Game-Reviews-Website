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
	 * Executes an arbitrary query
	 * @abstract
	 * @param {string} query - SQL query being executed
	 * @throws {NotImplemented}
	 */
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
			'`title` = ?, `summary` = ?, `imageSrc` = ?, ' +
			'`rating` = ?, `submittedBy` = ? WHERE `id` = ?;',
			game.title,
			game.summary,
			game.imageSrc,
			game.rating,
			game.submittedBy,
			game.id
		)

		for (const category of game.categories) {
			await this.createAndLinkGameCategory(game, category)
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
			'(`title`, `summary`, `imageSrc`, ' +
			' `rating`, `submittedBy`) ' +
			'VALUES (?, ?, ?, ?, ?);',
			game.title,
			game.summary,
			game.imageSrc,
			game.rating,
			game.submittedBy,
		)

		// update game id after insert
		game.id = lastID
		// link each category
		for (const category of game.categories) {
			await this.createAndLinkGameCategory(game, category)
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
	 * @returns {Category}
	 */
	async createCategory(category) {
		const sqlite = await this.sqlitePromise

		const { lastID } = await sqlite.run(
			'INSERT INTO `categories` (`name`) VALUES (?)',
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
}

module.exports = {
	DbContext,
	SqliteDbContext
}
