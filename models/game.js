'use strict'

// imported for JSDoc
// eslint-disable-next-line no-unused-vars
const Category = require('./category')

/**
 * Represents a Game in the database
 */
class Game {
	/**
	 * @param {string} title - Title of the Game
	 * @param {string} summary - Summary of the Game
	 * @param {string} imageSrc - URL to image for Game
	 * @param {number} rating - Overall rating
	 * @param {number} submittedBy - User ID of the User who submitted
	 */
	// eslint-disable-next-line max-lines-per-function
	constructor(title, summary, imageSrc, rating, submittedBy) {
		/**
		 * ID of the Game.
		 * @private
		 * @member {number}
		 */
		this.id = -1

		/**
		 * Title of the Game.
		 * @member {string}
		 */
		this.title = title

		/**
		 * Summary of the Game.
		 * @member {string}
		 */
		this.summary = summary

		/**
		 * URL of the image for the Game.
		 * @member {string}
		 */
		this.imageSrc = imageSrc

		/**
		 * Overall rating of the Game.
		 * @member {number}
		 */
		this.rating = rating

		/**
		 * User ID of the User who submitted.
		 * @member {number}
		 */
		this.submittedBy = submittedBy

		/**
		 * List of Categories for the Game.
		 * @member {Category[]}
		 * @type {Array.<Category>}
		 */
		this.categories = []
	}
}

module.exports = Game
