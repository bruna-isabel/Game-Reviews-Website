'use strict'

class Game {
	constructor(title, summary, imageSrc, rating, submittedBy) {
		this.id = -1
		this.title = title
		this.summary = summary
		this.imageSrc = imageSrc
		this.rating = rating
		this.submittedBy = submittedBy
	}
}

module.exports = Game
