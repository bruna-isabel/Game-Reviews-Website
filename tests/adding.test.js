'use strict'

const path = require('path')

const request = require('supertest')

const app = require('../app')

const { runSQLScript } = require('../build/utils')
const { SqliteDbContext } = require('../db')

const dbContext = new SqliteDbContext()

let server
/** @type {request.SuperTest<request.Test>} */
let loggedInAgent

beforeAll(async() => {
	const db = await dbContext.sqlitePromise
	// build db
	await runSQLScript(db, path.join(__dirname, '../build/build_db.sql'))
	await runSQLScript(db, path.join(__dirname, '../build/add_data.sql'))

	// clear games table
	await db.exec('DELETE FROM `games`;')

	// link db
	app.context.db = dbContext

	server = app.listen(0)

	loggedInAgent = request.agent(server)
	await loggedInAgent
		.post('/login')
		.send({ username: 'admin', password: 'hello' })
})

afterAll(() => {
	server.close()
})

test('should add game successfully', async() => {
	const res = await loggedInAgent
		.post('/adding/game')
		.attach('splash', path.join(__dirname, './examples/serve/example.png'))
		.attach('poster', path.join(__dirname, './examples/serve/example.jpg'))
		.field('title', 'a game that doesn\'t exist')
		.field('platforms-2', 2)
		.field('platforms-3', 3)
		.field('categories-1', 1)
		.field('categories-2', 2)
		.field('slugline', 'slugline')
		.field('summary', 'summary')
		.field('releaseDate', '10/10/2018')
		.field('developer', 'Developer')
		.field('publisher', 'Publisher')

	expect(res.status).not.toEqual(500)

	const game = (await dbContext.getGames())[0]
	const platforms = [
		await dbContext.getPlatform(2),
		await dbContext.getPlatform(3)
	]
	const categories = [
		await dbContext.getCategory(1),
		await dbContext.getCategory(2)
	]

	expect(game.title).toEqual('a game that doesn\'t exist')
	expect(game.slugline).toEqual('slugline')
	expect(game.summary).toEqual('summary')
	expect(game.releaseDate).toEqual('10/10/2018')
	expect(game.developer).toEqual('Developer')
	expect(game.publisher).toEqual('Publisher')
	expect(game.poster).toBeTruthy()
	expect(game.splash).toBeTruthy()
	expect(game.platforms).toEqual(platforms)
	expect(game.categories).toEqual(categories)
})
