/*
 * Testing user validation
 */

'use strict'

const userValidation = require('../utils/uservalidation.js')

describe('username', () => {

	test('should be inserted', () => {
		expect(() => userValidation.validateUsername('')).toThrowError('username was not entered')
	})

	test('should only have legal characters', () => {
		expect(userValidation.validateUsername('aaaaaaa')).toBeTruthy
		expect(userValidation.validateUsername('aaaaaaa1')).toBeTruthy
		expect(userValidation.validateUsername('aaaaaaA')).toBeTruthy
		expect(() => userValidation.validateUsername('aaaaaaa¶')).toThrowError('username contains illegal characters')
	})

	test ('should have min 4 and max 30 characters', () => {
		expect(() => userValidation.validateUsername('abc')).toThrowError('username must have in between 4 and 30 characters')
		expect(() => userValidation.validateUsername('1234567890123456789012345678901')).toThrowError('username must have in between 4 and 30 characters')
		expect( userValidation.validateUsername('abcderfj')).toBeTruthy
	})

})

describe('password', () => {

	test('should be inserted', ()  => {
		expect( () => userValidation.validatePassword('')).toThrowError('password was not entered');
	})

	test ('should only have legal characters', () => {
		expect(userValidation.validatePassword('aAaaa2aa!a')).toBeTruthy
		expect( () => userValidation.validatePassword('aa1aaAaaaa¶')).toThrowError('password contains illegal characters');
	})
	test ('should have min 8 and max 15 characters', () => {
		expect( () => userValidation.validatePassword('a!A1ec')).toThrowError('password has to be inbetween 8 and 15 characters');
		expect( () => userValidation.validatePassword('1234567890123456789!Aa1')).toThrowError('password has to be inbetween 8 and 15 characters');
		expect( userValidation.validateUsername('abcderfJ2!')).toBeTruthy
	})

	test ('should have one lowercase, one uppercase, one number and one symbol', () => {
		expect( userValidation.validatePassword('a1eC2019!')).toBeTruthy
		expect(() => userValidation.validatePassword('aleC!alec')).toThrowError('password does not have all the right requirements' );
		expect(() => userValidation.validatePassword('alec2029!')).toThrowError('password does not have all the right requirements ');
		expect(() => userValidation.validatePassword('ALEC2029!')).toThrowError('password does not have all the right requirements ');
		expect(() => userValidation.validatePassword('alec12lec')).toThrowError('password does not have all the right requirements ');
		})
})

describe('confirm password', () => {
	test('should be equal to password', () => {

		expect(() => userValidation.validateConfirmPassword('ALEc@2029!', 'ALEc&2029!')).toThrowError('password does not match Confirm Password')
	})

})
