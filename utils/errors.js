/**
 * Common error types
 */

'use strict'

class NotImplemented extends Error {
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
