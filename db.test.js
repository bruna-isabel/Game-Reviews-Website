'use strict'

const path = require('path')

const db = require('./db')

const { runSQLScript } = require('./build/utils')

const {
	NotImplemented,
	EntityNotFound
} = require('./utils/errors')

const User = require('./models/user')
const Game = require('./models/game')

const BUILD_DB_SCRIPT = path.join(__dirname, 'build/build_db.sql')

describe('abstract database context', () => {
	const context = new db.DbContext()

	test('should be not implemented', async() => {

		await expect(context.getUsers())
			.rejects
			.toThrowError(new NotImplemented('getUsers is not implemented'))

		await expect(context.getUser())
			.rejects
			.toThrowError(new NotImplemented('getUser is not implemented'))

		await expect(context.deleteUser())
			.rejects
			.toThrowError(new NotImplemented('deleteUser is not implemented'))

		await expect(context.createUser())
			.rejects
			.toThrowError(new NotImplemented('createUser is not implemented'))

		await expect(context.updateUser())
			.rejects
			.toThrowError(new NotImplemented('updateUser is not implemented'))

		await expect(context.execute())
			.rejects
			.toThrowError(new NotImplemented('execute is not implemented'))
	})
})

describe('user database with sqlite', () => {
	// create an in memory db
	const sqliteContext = new db.SqliteDbContext(':memory:')

	beforeAll(async() => {
		const db = await sqliteContext.sqlitePromise
		await runSQLScript(db, BUILD_DB_SCRIPT)
	})

	beforeEach(async() => {
		const db = await sqliteContext.sqlitePromise
		// clear table
		await db.exec('DELETE FROM `users`;')
		// insert test users
		await db.exec('INSERT INTO `users` VALUES (10, \'hakasec\', \'test\'), (11, \'hello\', \'world\');')
	})

	test('should get a user by id', async() => {
		expect(await sqliteContext.getUser(10))
			.toEqual({ id: 10, username: 'hakasec', hash: 'test' })
	})

	test('should get a user by username', async() => {
		expect(await sqliteContext.getUser('hakasec'))
			.toEqual({ id: 10, username: 'hakasec', hash: 'test' })
	})

	test('should get all users', async() => {
		expect(await sqliteContext.getUsers())
			.toContainEqual({ id: 11, username: 'hello', hash: 'world' })
	})

	test('should create a user', async() => {
		const user = await sqliteContext.createUser(new User('hello1', 'world'))
		expect(user.id).not.toEqual(-1)
	})

	test('should delete a user by id', async() => {
		await sqliteContext.deleteUser(10)

		const userCheck = await sqliteContext.sqlitePromise.then(
			db => db.get('SELECT * FROM `users` WHERE `id` = 10;')
		)

		expect(userCheck).toBe(undefined)
	})

	test('should delete a user by username', async() => {
		await sqliteContext.deleteUser('hakasec')

		const userCheck = await sqliteContext.sqlitePromise.then(
			db => db.get('SELECT * FROM `users` WHERE `id` = \'hakasec\';')
		)

		expect(userCheck).toBe(undefined)
	})

	test('should update a user', async() => {
		const user = await sqliteContext.getUser('hakasec')
		user.hash = 'test1'

		expect(await sqliteContext.updateUser(user)).toEqual(user)
	})
})

describe('game database with sqlite', () => {
	// create an in memory db
	const sqliteContext = new db.SqliteDbContext(':memory:')

	beforeAll(async() => {
		// set up db
		const db = await sqliteContext.sqlitePromise
		await runSQLScript(db, BUILD_DB_SCRIPT)

		// add dummy user
		await db.exec('INSERT INTO `users` VALUES (10, \'hakasec\', \'test\'), (11, \'hello\', \'world\');')
	})

	beforeEach(async() => {
		const db = await sqliteContext.sqlitePromise

		// clear games data
		await db.exec('DELETE FROM `games`;')

		// insert dummy games data
		await db.exec(
			'INSERT INTO `games` ' +
			'(`id`, `title`, `summary`, `imageSrc`, `rating`, `submittedBy`) ' +
			'VALUES ' +
			'(1, \'game1\', \'summary!!!\', \'image1.png\', 5, 10), ' +
			'(2, \'game2\', \'summary!!\', \'image2.png\', 2, 10);'
		)
	})

	test('should get all games', async() => {
		expect(await sqliteContext.getGames()).toEqual(
			[
				{
					id: 1,
					title: 'game1',
					summary: 'summary!!!',
					imageSrc: 'image1.png',
					rating: 5,
					submittedBy: 10
				},
				{
					id: 2,
					title: 'game2',
					summary: 'summary!!',
					imageSrc: 'image2.png',
					rating: 2,
					submittedBy: 10
				}
			]
		)
	})

	test('should get game by id', async() => {
		expect(await sqliteContext.getGame(2))
			.toEqual(
				{
					id: 2,
					title: 'game2',
					summary: 'summary!!',
					imageSrc: 'image2.png',
					rating: 2,
					submittedBy: 10
				}
			)

		let error = null;
		try {
			await sqliteContext.getGame(3)
		} catch (e) {
			error = e
		}

		expect(error)
			.toStrictEqual(new EntityNotFound('game with id 3 not found'))
	})

	test('should update a game', async() => {
		const game = await sqliteContext.getGame(1)
		game.title = 'new title'

		expect((await sqliteContext.updateGame(game)).title).toEqual('new title')

		let error = null

		try {
			// check for missing id
			game.id = 3
			await sqliteContext.updateGame(game)
		} catch (e) {
			error = e
		} finally {
			expect(error)
				.toStrictEqual(new EntityNotFound('game with id 3 not found'))
			error = null
		}

		try {
			// check for missing user
			game.id = 1
			game.submittedBy = 1
			await sqliteContext.updateGame(game)
		} catch (e) {
			error = e
		} finally {
			expect(error)
				.toStrictEqual(new EntityNotFound('user with id 1 not found'))
			error = null
		}
	})

	test('should delete a game', async() => {
		await sqliteContext.deleteGame(1)

		let error = null
		try {
			await sqliteContext.getGame(1)
		} catch (e) {
			error = e
		} finally {
			expect(error)
				.toStrictEqual(new EntityNotFound('game with id 1 not found'))
			error = null
		}

		// check non existent game deletion
		try {
			await sqliteContext.deleteGame(1)
		} catch (e) {
			error = e
		} finally {
			expect(error)
				.toStrictEqual(new EntityNotFound('game with id 1 not found'))
			error = null
		}
	})

	test('should create a game', async() => {
		const game = new Game('title1', 'hello', 'world', 5, 10)
		const returned = await sqliteContext.createGame(game)

		expect(returned.id).not.toEqual(-1)
		expect(returned.title).toEqual('title1')
		expect(returned.summary).toEqual('hello')
		expect(returned.imageSrc).toEqual('world')
		expect(returned.rating).toEqual(5)
		expect(returned.submittedBy).toEqual(10)
	})
})

