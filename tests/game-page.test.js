/*
 * Testing functionality of the individual game page
 */

'use strict'

const game = require('../public/GamePage.js')

describe('username', () => {


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
	})
