/*
 * Testing user validation
 */

'use strict'
const userValidation = require('../utils/uservalidation.js')

//tests for validating username
describe('username', () => {

	// block of tests
	beforeEach( async() => {
		userValidation.clear()
	})
	afterEach( async() => {
		// runs after each test completes
	})

	//Missing:  database username test that verifies that a username already exists


	test('should be inserted', async done => {
		expect(validateUsername(' ')).toThrowError('username was not inserted');
	})

	test ('should only have legal characters', async done => {
		expect(validateUsername('aaaaaaa')).toBeTruthy;
		expect(validateUsername('aaaaaaa1')).toBeTruthy;
		expect(validateUsername('aaaaaaA')).toBeTruthy;
		expect(validateUsername('aaaaaaa¶')).toThrowError('username contains illegal characters');
	})

	test ('should have min 4 and max 30 characters', async done => {
		expect(validateUsername('abc')).toThrowError('username has less than 4 characters');
		expect(validateUsername('1234567890123456789012345678901')).toThrowError('username has more than 30 characters');
		expect(validateUsername('abcderfj')).toBeTruthy;
	})

})

describe('email', () => {

	// block of tests
	beforeEach( async() => {
		userValidation.clear()
	})
	afterEach( async() => {
		// runs after each test completes
	})

	//It's missing the database email test that verifies that an email already exists


	test('should be inserted', async done => {
		expect(validateEmail(' ')).toThrowError('email was not inserted');
	})

	test ('should be in correct format', async done => {
		expect(validateEmail('aaaa@bbbb.com')).toBeTruthy;
		expect(validateEmail('aaaa1@bbbb.co.uk')).toBeTruthy;
		expect(validateEmail('@bbb.com')).toThrowError('email in incorrect format');
		expect(validateEmail('aaa1@.com')).toThrowError('email in incorrect format');
		expect(validateEmail('aaa@bbb')).toThrowError('email in incorrect format');
		expect(validateEmail('@bbbcom')).toThrowError('email in incorrect format'); 

	})

	test ('should have lowercase letters only', async done => {
		expect(validateEmail('aaAA@bbbb.com')).toThrowError('email has uppercase letters');
		expect(validateEmail('aaaAA@bbBB.com')).toThrowError('email has uppercase letters');
		expect(validateEmail('aaaa@bbbb.com')).toBeTruthy;
	})

})

describe('password', () => {

	// block of tests
	beforeEach( async() => {
		userValidation.clear()
	})
	afterEach( async() => {
		// runs after each test completes
	})

	test('should be inserted', async done => {
		expect(validatePassword(' ')).toThrowError('password was not inserted');
	})

	test ('should only have legal characters', async done => {
		expect(validatePassword('aAaaa2aa!a')).toBeTruthy;
		expect(validatePassword('aa1aaAaaaa¶')).toThrowError('password contains illegal characters');
	})
	test ('should have min 8 and max 15 characters', async done => {
		expect(validatePassword('a!A1ec')).toThrowError('password has less than 8 characters');
		expect(validatePassword('1234567890123456789!Aa1')).toThrowError('password has more than 15 characters');
		expect(validateUsername('abcderfJ2!')).toBeTruthy;
	})

	test ('should have one lowercase, one uppercase, one number and one symbol', async done => {
		expect(validatePassword('a1eC2019!')).toBeTruthy;
		expect(validatePassword('aleC!alec')).toThrowError('password has to contain at least one number');
		expect(validatePassword('alec2029!')).toThrowError('password has to contain at least one uppercase letter');
		expect(validatePassword('ALEC2029!')).toThrowError('password has to contain at least one lowercase letter');
		expect(validatePassword('alec12lec')).toThrowError('password has to contain at least one symbol');
		})
})

test('should be equal to password', async done => {
	expect(validatePassword).toBeEqual(validateConfirmPassword);
})

describe('confirm password', async => {

	// before each function
	beforeEach( async() => {
		userValidation.clear()
	})

	afterEach( async() => {
		// runs after each test completes
	})

	test('should be inserted', async done => {
		expect(validateConfirmPassword(' ')).toThrowError('confirm password was not inserted');
	})

	test('should be equal to password', async done => {
		expect(validateConfirmPassword).toBeEqual(validatePassword);
	})

})
