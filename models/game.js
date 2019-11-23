'use strict'

class Game {
	constructor(title, platforms, slugline, summary, releaseDate, director, publisher, submittedBy, approved, poster, splash) {
		this.gameID = -1
		this.title = title
		this.platforms = platforms
		this.slugline = slugline
		this.summary = summary
		this.releaseDate = releaseDate
		this.director = director
		this.publisher = publisher
		this.submittedBy = submittedBy
		this.approved = approved
		this.poster = poster
		this.splash = splash
	}
}

module.exports = Game
