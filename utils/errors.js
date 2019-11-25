/*
 * Common error types
 */

'use strict'

/**
 * Error for use when a function is not implemented.
 */
class NotImplemented extends Error {
	/**
	 * @param {string} message - Internal message of the Error.
	 */
	constructor(message) {
		super(message)
	}
}

/**
 * Error for use when an entity in the database is not found.
 */
class EntityNotFound extends Error {
	/**
	 * @param {string} message - Internal message of the Error.
	 */
	constructor(message) {
		super(message)
	}
}

module.exports = {
	NotImplemented,
	EntityNotFound
}
