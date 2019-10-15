/**
 * Common error types
 */

'use strict'

class NotImplemented extends Error {
	constructor(message) {
		super(message)
	}
}

module.exports = {
	NotImplemented,
}
