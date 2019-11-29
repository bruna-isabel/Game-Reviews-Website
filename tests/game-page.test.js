/*
 * Testing functionality of the individual game page
 */

'use strict'

const game = require('../controllers/game.js')

describe('username', () => {

	test('game ID should be an integer.', () => {
		expect(() => userValidation.validateUsername('')).toThrowError('username was not entered')
	})

/*
SHOULD BE GIVEN A GAME

})