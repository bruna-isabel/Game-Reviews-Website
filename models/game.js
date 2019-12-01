'use strict'

// imported for JSDoc
// eslint-disable-next-line no-unused-vars
const Category = require('./category')

/**
 * Represents a Game in the database
 */
class Game {
	// eslint-disable-next-line max-params
	constructor(
		title, slugline,
		summary, releaseDate, developer,
		publisher, submittedBy, approved,
		poster, splash
	) {
		this.id = -1
		this.title = title
		this.slugline = slugline
		this.summary = summary
		this.releaseDate = releaseDate
		this.developer = developer
		this.publisher = publisher
		this.submittedBy = submittedBy
		this.approved = approved
		this.poster = poster
		this.splash = splash
		this.platforms = []
		this.categories = []
	}

	/**
	 * Alias for the id field
	 */
	get gameID() {
		return this.id
	}

	set gameID(val) {
		this.id = val
	}
}

module.exports = Game
