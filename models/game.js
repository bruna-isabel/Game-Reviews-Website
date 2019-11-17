'use strict'

class Game {
	constructor(title, summary, imageSrc, rating, submittedBy, approved) {
		this.gameID = -1
		this.title = title
		this.summary = summary
		this.imageSrc = imageSrc
		this.rating = rating
		this.submittedBy = submittedBy
		this.approved = approved
	}
}

module.exports = Game
