'use strict'

class Game {
	constructor(title, slugline, summary, releaseDate, director, publisher, rating, submittedBy, approved, poster, splash) {
		this.gameID = -1
		this.title = title
		this.slugline = slugline
		this.summary = summary
		this.releaseDate = releaseDate
		this.director = director
		this.publisher = publisher
		this.rating = rating
		this.submittedBy = submittedBy
		this.approved = approved
		this.poster = poster
		this.splash = splash
	}
}

module.exports = Game
