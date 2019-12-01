'use strict'

const path = require('path')

const db = require('../db')
const { runSQLScript } = require('../build/utils')

const {
	NotImplemented,
	EntityNotFound
} = require('../utils/errors')

const User = require('../models/user')
const Game = require('../models/game')
const Category = require('../models/category')
const Platform = require('../models/platform')
const Review = require('../models/review')
const Comment = require('../models/comment')


const BUILD_DB_SCRIPT = path.join(__dirname, '../build/build_db.sql')

const sqliteContext = new db.SqliteDbContext(':memory:')

// build the database
beforeAll(async() => {
	const db = await sqliteContext.sqlitePromise
	await runSQLScript(db, BUILD_DB_SCRIPT)
})

// clean any data
afterEach(async() => {
	const db = await sqliteContext.sqlitePromise

	const tables = await db.all('SELECT `tbl_name` FROM `sqlite_master`;')

	for (const table of tables) {
		const name = table['tbl_name']
		await db.exec(`DELETE FROM \`${name}\`;`)
		await db.exec(`DELETE FROM sqlite_sequence WHERE name = \'${name}\';`)
	}
})

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

	beforeEach(async() => {
		const db = await sqliteContext.sqlitePromise
		// clear table
		await db.exec('DELETE FROM `users`;')
		// insert test users
		await db.exec(
			'INSERT INTO `users` (`id`, `username`, `hash`) ' +
			'VALUES ' +
			'(10, \'hakasec\', \'test\'),' +
			'(11, \'hello\', \'world\');'
		)
	})

	test('should get a user by id', async() => {
		expect(await sqliteContext.getUser(10))
			.toEqual({ id: 10, username: 'hakasec', hash: 'test', isAdmin: null })

		// expect(await sqliteContext.getUser(1234))
		// 	.toBe(null)
	})

	test('should get a user by username', async() => {
		expect(await sqliteContext.getUser('hakasec'))
			.toEqual({ id: 10, username: 'hakasec', hash: 'test', isAdmin: null })

		// expect(await sqliteContext.getUser('notauser'))
		// 	.toBe(null)
	})

	test('should get all users', async() => {
		expect(await sqliteContext.getUsers())
			.toContainEqual({ id: 11, username: 'hello', hash: 'world', isAdmin: null })
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

describe('get all the platform names from the table', () => {

	beforeEach(async() => {
		await sqliteContext.sqlitePromise.then(async db => {
		//DELETE the table
			await db.exec('DROP TABLE IF EXISTS`platforms`;')
			//CREATE the table
			await db.exec('CREATE TABLE `platforms`(`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT);')
			//INSERT into the table
			await db.exec('INSERT INTO `platforms` (name) VALUES("gameboy"),("XBOX");')
		})
	})

	test('take all the platform names from the table', async() => {
		expect.assertions(1)
		expect(await sqliteContext.getAllPlatforms())
			.toContainEqual({ id: 1, name: 'gameboy'})
	})
})

describe('game database with sqlite', () => {

	beforeEach(async() => {
		const db = await sqliteContext.sqlitePromise

		// add dummy user
		await db.exec(
			'INSERT INTO `users` (`id`, `username`, `hash`) VALUES ' +
			'(10, \'hakasec\', \'test\'), ' +
			'(11, \'hello\', \'world\');'
		)

		// insert dummy games data
		await db.exec(
			'INSERT INTO `games` ' +
			'(`id`, `title`, `summary`, ' +
			' `poster`, `slugline`, `submittedBy`, ' +
			' `releaseDate`, `developer`, `publisher`, ' +
			' `approved`, `splash`) ' +
			'VALUES ' +
			'(1, \'game1\', \'summary!!!\', ' +
			' \'image1.png\', \'123\', 10, ' +
			' \'2019-09-01\', \'Dev\', \'Pub\', ' +
			' \'yes\', \'slash1.png\'), ' +
			'(2, \'game2\', \'summary!!\', ' +
			' \'image2.png\', \'456\', 10, ' +
			' \'2019-10-10\', \'Dev2\', \'Pub\', ' +
			' \'no\', \'slash2.jpg\');'
		)
	})

	test('should get all games', async() => {
		expect(await sqliteContext.getGames()).toEqual(
			[
				{
					id: 1,
					title: 'game1',
					summary: 'summary!!!',
					poster: 'image1.png',
					slugline: '123',
					submittedBy: 10,
					releaseDate: '2019-09-01',
					developer: 'Dev',
					publisher: 'Pub',
					splash: 'slash1.png',
					approved: 'yes',
					categories: [],
					platforms: []
				},
				{
					id: 2,
					title: 'game2',
					summary: 'summary!!',
					poster: 'image2.png',
					slugline: '456',
					submittedBy: 10,
					releaseDate: '2019-10-10',
					developer: 'Dev2',
					publisher: 'Pub',
					splash: 'slash2.jpg',
					approved: 'no',
					categories: [],
					platforms: []
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
					poster: 'image2.png',
					slugline: '456',
					submittedBy: 10,
					releaseDate: '2019-10-10',
					developer: 'Dev2',
					publisher: 'Pub',
					splash: 'slash2.jpg',
					approved: 'no',
					categories: [],
					platforms: []
				}
			)

		await expect(sqliteContext.getGame(3))
			.rejects
			.toThrowError(new EntityNotFound('game with id 3 not found'))
	})

	test('should update a game', async() => {
		const game = await sqliteContext.getGame(1)
		game.title = 'new title'

		expect((await sqliteContext.updateGame(game)).title)
			.toEqual('new title')

		// check for missing id
		game.id = 3
		await expect(sqliteContext.updateGame(game))
			.rejects
			.toThrowError(new EntityNotFound('game with id 3 not found'))

		// check for missing user
		game.id = 1
		game.submittedBy = 42
		await expect(sqliteContext.updateGame(game))
			.rejects
			.toThrowError(new EntityNotFound('user with id 42 not found'))
	})

	test('should delete a game', async() => {
		await sqliteContext.deleteGame(1)

		// get non existent game
		await expect(sqliteContext.getGame(1))
			.rejects
			.toThrowError(new EntityNotFound('game with id 1 not found'))

		// check non existent game deletion
		await expect(sqliteContext.deleteGame(1))
			.rejects
			.toThrowError(new EntityNotFound('game with id 1 not found'))
	})

	test('should create a game', async() => {
		const game = new Game(
			'title1',
			'hello',
			'world',
			'2019-01-10',
			'Naughty Dog',
			'Sony',
			10,
			'no',
			'hello.png',
			'splash.png'
		)

		const returned = await sqliteContext.createGame(game)
		expect(returned.title).toEqual('title1')
		expect(returned.slugline).toEqual('hello')
		expect(returned.summary).toEqual('world')
		expect(returned.releaseDate).toEqual('2019-01-10')
		expect(returned.developer).toEqual('Naughty Dog')
		expect(returned.publisher).toEqual('Sony')
		expect(returned.submittedBy).toEqual(10)
		expect(returned.approved).toEqual('no')
		expect(returned.poster).toEqual('hello.png')
		expect(returned.splash).toEqual('splash.png')
	})
})

describe('games database with platforms', () => {

	beforeEach(async() => {
		const db = await sqliteContext.sqlitePromise

		// add dummy user
		await db.exec(
			'INSERT INTO `users` (`id`, `username`, `hash`) ' +
			'VALUES (10, \'hakasec\', \'test\');'
		)

		// insert dummy games data
		await db.exec(
			'INSERT INTO `games` ' +
			'(`id`, `title`, `summary`, ' +
			' `poster`, `slugline`, `submittedBy`, ' +
			' `releaseDate`, `developer`, `publisher`, ' +
			' `approved`, `splash`) ' +
			'VALUES ' +
			'(1, \'game1\', \'summary!!!\', ' +
			' \'image1.png\', \'123\', 10, ' +
			' \'2019-09-01\', \'Dev\', \'Pub\', ' +
			' \'yes\', \'slash1.png\'), ' +
			'(2, \'game2\', \'summary!!\', ' +
			' \'image2.png\', \'456\', 10, ' +
			' \'2019-10-10\', \'Dev2\', \'Pub\', ' +
			' \'no\', \'slash2.jpg\');'
		)

		await db.exec(
			'INSERT INTO `platforms` (`id`, `name`) ' +
			'VALUES ' +
			'(1, \'Nintendo Switch\'), ' +
			'(2, \'Xbox\'), ' +
			'(3, \'PlayStation\');'
		)

		await db.exec(
			'INSERT INTO `gamePlatforms` ' +
			'VALUES ' +
			'(1, 1), ' +
			'(1, 2), ' +
			'(2, 2);'
		)
	})

	test('should get game with linked platforms', async() => {
		expect(await sqliteContext.getGame(1))
			.toEqual(
				{
					id: 1,
					title: 'game1',
					summary: 'summary!!!',
					poster: 'image1.png',
					slugline: '123',
					submittedBy: 10,
					releaseDate: '2019-09-01',
					developer: 'Dev',
					publisher: 'Pub',
					splash: 'slash1.png',
					approved: 'yes',
					categories: [],
					platforms: [
						{ id: 1, name: 'Nintendo Switch' },
						{ id: 2, name: 'Xbox' }
					]
				}
			)

		expect((await sqliteContext.getGame(2)).platforms)
			.toEqual(
				[
					{ id: 2, name: 'Xbox' }
				]
			)
	})

	test('should get platforms by gameID', async() => {
		expect(await sqliteContext.getGamePlatforms(1))
			.toEqual(
				[
					{ id: 1, name: 'Nintendo Switch' },
					{ id: 2, name: 'Xbox' }
				]
			)

		// check for error on nonexistant game
		await expect(sqliteContext.getGameCategories(3))
			.rejects
			.toThrowError(new EntityNotFound('game with id 3 not found'))
	})

	test('should add new game with existing platforms', async() => {
		const game = new Game('1', '2', '3', 4, 10)
		const platform = await sqliteContext.getPlatform(1)

		game.platforms.push(platform)

		expect((await sqliteContext.createGame(game)).platforms)
			.toEqual(
				[
					{ id: 1, name: 'Nintendo Switch' }
				]
			)
	})

	test('should add new game with new platforms', async() => {
		const game = new Game('1', '2', '3', 4, 10)
		const platform = new Platform('Google Stadia')

		game.platforms.push(platform)

		expect((await sqliteContext.createGame(game)).platforms)
			.toEqual(
				[
					{ id: 4, name: 'Google Stadia' }
				]
			)
	})

	test('should update existing game with existing platforms', async() => {
		const game = await sqliteContext.getGame(2)
		const platform = await sqliteContext.getPlatform(3)

		game.platforms.push(platform)

		expect((await sqliteContext.updateGame(game)).platforms)
			.toEqual(
				[
					{ id: 2, name: 'Xbox' },
					{ id: 3, name: 'PlayStation' }
				]
			)
	})

	test('should update existing game with new platform', async() => {
		const game = await sqliteContext.getGame(1)

		game.platforms.push(new Platform('PC'))

		expect((await sqliteContext.updateGame(game)).platforms)
			.toEqual(
				[
					{ id: 1, name: 'Nintendo Switch' },
					{ id: 2, name: 'Xbox' },
					{ id: 4, name: 'PC' }
				]
			)
	})
})

describe('games database with categories', () => {

	beforeEach(async() => {
		const db = await sqliteContext.sqlitePromise

		// add dummy user
		await db.exec(
			'INSERT INTO `users` (`id`, `username`, `hash`) ' +
			'VALUES (10, \'hakasec\', \'test\');'
		)

		// insert dummy categories data
		await db.exec(
			'INSERT INTO `categories` ' +
			'VALUES ' +
			'(1, \'Horror\'), ' +
			'(2, \'Action\'), ' +
			'(3, \'Something else\');'
		)

		// insert dummy games data
		await db.exec(
			'INSERT INTO `games` ' +
			'(`id`, `title`, `summary`, ' +
			' `poster`, `slugline`, `submittedBy`, ' +
			' `releaseDate`, `developer`, `publisher`, ' +
			' `approved`, `splash`) ' +
			'VALUES ' +
			'(1, \'game1\', \'summary!!!\', ' +
			' \'image1.png\', \'123\', 10, ' +
			' \'2019-09-01\', \'Dev\', \'Pub\', ' +
			' \'yes\', \'slash1.png\'), ' +
			'(2, \'game2\', \'summary!!\', ' +
			' \'image2.png\', \'456\', 10, ' +
			' \'2019-10-10\', \'Dev2\', \'Pub\', ' +
			' \'no\', \'slash2.jpg\');'
		)

		// link games and categories
		await db.exec(
			'INSERT INTO `gameCategories`' +
			'VALUES' +
			'(1, 1),' +
			'(1, 2);'
		)
	})

	test('should get game with linked categories', async() => {
		expect(await sqliteContext.getGame(1))
			.toEqual(
				{
					id: 1,
					title: 'game1',
					summary: 'summary!!!',
					poster: 'image1.png',
					slugline: '123',
					submittedBy: 10,
					releaseDate: '2019-09-01',
					developer: 'Dev',
					publisher: 'Pub',
					splash: 'slash1.png',
					approved: 'yes',
					categories: [
						{ id: 1, name: 'Horror' },
						{ id: 2, name: 'Action' }
					],
					platforms: []
				}
			)

		expect((await sqliteContext.getGame(2)).categories).toEqual([])
	})

	test('should get categories by gameID', async() => {
		expect(await sqliteContext.getGameCategories(1))
			.toEqual(
				[
					{ id: 1, name: 'Horror' },
					{ id: 2, name: 'Action' }
				]
			)

		// check empty return
		expect(await sqliteContext.getGameCategories(2))
			.toEqual([])

		// check for error on nonexistant game
		await expect(sqliteContext.getGameCategories(3))
			.rejects
			.toThrowError(new EntityNotFound('game with id 3 not found'))
	})

	test('should add new game with existing categories', async() => {
		const game = new Game('1', '2', '3', 4, 10)
		const category = await sqliteContext.getCategory(1)

		game.categories.push(category)

		expect((await sqliteContext.createGame(game)).categories)
			.toEqual(
				[
					{ id: 1, name: 'Horror' }
				]
			)
	})

	test('should add new game with new categories', async() => {
		const game = new Game('1', '2', '3', 4, 10)
		const category = new Category('Open World')

		game.categories.push(category)

		expect((await sqliteContext.createGame(game)).categories)
			.toEqual(
				[
					{ id: 4, name: 'Open World' }
				]
			)
	})

	test('should update existing game with existing categories', async() => {
		const game = await sqliteContext.getGame(2)
		const category = await sqliteContext.getCategory(3)

		game.categories.push(category)

		expect((await sqliteContext.updateGame(game)).categories)
			.toEqual(
				[
					{ id: 3, name: 'Something else' }
				]
			)
	})

	test('should update existing game with new category', async() => {
		const game = await sqliteContext.getGame(1)

		game.categories.push(new Category('New'))

		expect((await sqliteContext.updateGame(game)).categories)
			.toEqual(
				[
					{ id: 1, name: 'Horror' },
					{ id: 2, name: 'Action' },
					{ id: 4, name: 'New' }
				]
			)
	})
})

describe('reviews database with sqlite', () => {

	beforeEach(async() => {
		const db = await sqliteContext.sqlitePromise

		// add dummy user
		await db.exec(
			'INSERT INTO `users` (`id`, `username`, `hash`) ' +
			'VALUES (10, \'hakasec\', \'test\');'
		)

		// insert dummy games data
		await db.exec(
			'INSERT INTO `games` ' +
			'(`id`, `title`, `summary`, ' +
			' `poster`, `slugline`, `submittedBy`, ' +
			' `releaseDate`, `developer`, `publisher`, ' +
			' `approved`, `splash`) ' +
			'VALUES ' +
			'(1, \'game1\', \'summary!!!\', ' +
			' \'image1.png\', \'123\', 10, ' +
			' \'2019-09-01\', \'Dev\', \'Pub\', ' +
			' \'yes\', \'slash1.png\'), ' +
			'(2, \'game2\', \'summary!!\', ' +
			' \'image2.png\', \'456\', 10, ' +
			' \'2019-10-10\', \'Dev2\', \'Pub\', ' +
			' \'no\', \'slash2.jpg\');'
		)

		await db.exec(
			'INSERT INTO `reviews`' +
			'VALUES ' +
			'(1, \'admin\', 1, 10, \'test review 1 text\', \'10/04/2019\', \'yes\'), ' +
			'(2, \'admin\', 1, 9, \'test review 2 text\', \'23/03/2019\', \'no\');'
		)
	})

	test('should get list of all reviews', async() => {
		expect(await sqliteContext.getReviews())
			.toContainEqual(
				{ id: 1, user: 'admin', game: 1, reviewScore: 10, reviewText: 'test review 1 text',
					reviewDate: '10/04/2019', approved: 'yes'}
			)
	})

	test('should get all reviews by game ID', async() => {
		expect(await sqliteContext.getReviewsForGame(1))
			.toContainEqual(
				{ id: 1, user: 'admin', game: 1, reviewScore: 10, reviewText: 'test review 1 text',
					reviewDate: '10/04/2019', approved: 'yes'}
			)

		await expect(sqliteContext.getReviewsForGame(3))
			.rejects
			.toThrowError(new EntityNotFound('game with id 3 not found'))
	})

	test('should review by review ID', async() => {
		expect(await sqliteContext.getReview(1))
			.toEqual(
				{ id: 1, user: 'admin', game: 1, reviewScore: 10, reviewText: 'test review 1 text',
					reviewDate: '10/04/2019', approved: 'yes'}
			)

		await expect(sqliteContext.getReview(3))
			.rejects
			.toThrowError(new EntityNotFound('review with id 3 not found'))
	})

	test('should delete a review by id', async() => {
		await sqliteContext.deleteReview(1)

		const reviewCheck = await sqliteContext.sqlitePromise.then(
			db => db.get('SELECT * FROM `reviews` WHERE `id` = 1;')
		)

		expect(reviewCheck).toBe(undefined)
	})

	test('should create a new review', async() => {
		const newReview = new Review('admin', 1, 8, 'created review', 'xx/xx/xxxx', 'no')

		await sqliteContext.createReview(newReview)
		const returned = await sqliteContext.getReview(3)
		expect(returned.id).toEqual(3)
		expect(returned.user).toEqual('admin')
		expect(returned.game).toEqual(1)
		expect(returned.reviewScore).toEqual(8)
		expect(returned.reviewText).toEqual('created review')
		expect(returned.approved).toEqual('no')
	})

	test('should update a review', async() => {
		const review = await sqliteContext.getReview(2)
		review.reviewText = 'review text updated'

		expect(await sqliteContext.updateReview(review)).toEqual(review)
	})

	test('should get list of all unapproved reviews', async() => {
		expect(await sqliteContext.approvalReviewList(true))
			.toContainEqual(
				{ id: 1, user: 'admin', game: 1, reviewScore: 10, reviewText: 'test review 1 text',
					reviewDate: '10/04/2019', approved: 'yes'}
			)
		expect(await sqliteContext.approvalReviewList(false))
			.toContainEqual(
				{ id: 2, user: 'admin', game: 1, reviewScore: 9, reviewText: 'test review 2 text',
					reviewDate: '23/03/2019', approved: 'no'}
			)
	})
})

describe('review comments database with sqlite', () => {

	beforeEach(async() => {
		const db = await sqliteContext.sqlitePromise

		// add dummy user
		await db.exec(
			'INSERT INTO `users` (`id`, `username`, `hash`) ' +
			'VALUES (10, \'hakasec\', \'test\');'
		)

		// insert dummy games data
		await db.exec(
			'INSERT INTO `games` ' +
			'(`id`, `title`, `summary`, ' +
			' `poster`, `slugline`, `submittedBy`, ' +
			' `releaseDate`, `developer`, `publisher`, ' +
			' `approved`, `splash`) ' +
			'VALUES ' +
			'(1, \'game1\', \'summary!!!\', ' +
			' \'image1.png\', \'123\', 10, ' +
			' \'2019-09-01\', \'Dev\', \'Pub\', ' +
			' \'yes\', \'slash1.png\'), ' +
			'(2, \'game2\', \'summary!!\', ' +
			' \'image2.png\', \'456\', 10, ' +
			' \'2019-10-10\', \'Dev2\', \'Pub\', ' +
			' \'no\', \'slash2.jpg\');'
		)

		await db.exec(
			'INSERT INTO `reviews`' +
			'VALUES ' +
			'(1, \'admin\', 1, 10, \'test review 1 text\', \'10/04/2019\', \'yes\');'
		)

		await db.exec(
			'INSERT INTO `reviewComments`' +
			'VALUES ' +
			'(1, 1, 1, \'admin\', \'10/04/2019\', \'19:20:00\', \'test comment 1\');'
		)
	})

	test('should post a new comment', async() => {
		const newComment = new Comment(1, 1, 'admin', 'xx/xx/xxxx', 'xx:xx:xx', 'test comment 2')

		await sqliteContext.postComment(newComment)
		const returned = await sqliteContext.getCommentsForReview(1)
		const returnedComment = returned[1]

		expect(returnedComment.id).toEqual(2)
		expect(returnedComment.gameID).toEqual(1)
		expect(returnedComment.reviewID).toEqual(1)
		expect(returnedComment.user).toEqual('admin')
		expect(returnedComment.commentText).toEqual('test comment 2')
	})

})
