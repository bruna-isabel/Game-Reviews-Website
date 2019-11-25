'use strict'

const db = require('../db')

const { NotImplemented } = require('../utils/errors')
const User = require('../models/user')

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

	beforeEach(async() => {
		await sqliteContext.sqlitePromise.then(async db => {
			// clear table
			await db.exec('DROP TABLE IF EXISTS `users`;')

			// create user table
			await db.exec(
				'CREATE TABLE `users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` TEXT UNIQUE, `hash` TEXT);'
			)

			// insert test users
			await db.exec('INSERT INTO `users` VALUES (10, \'hakasec\', \'test\'), (11, \'hello\', \'world\');')
		})
	})

	test('should get a user by id', async() => {
		expect(await sqliteContext.getUser(10))
			.toEqual({ id: 10, username: 'hakasec', hash: 'test' })

		expect(await sqliteContext.getUser(1234))
			.toBe(null)
	})

	test('should get a user by username', async() => {
		expect(await sqliteContext.getUser('hakasec'))
			.toEqual({ id: 10, username: 'hakasec', hash: 'test' })

		expect(await sqliteContext.getUser('notauser'))
			.toBe(null)
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
