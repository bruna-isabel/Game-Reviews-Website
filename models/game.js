'use strict'

class Game {
	constructor(title, summary, imageSrc, rating, submittedBy, approval) {
		this.gameID = -1
		this.title = title
		this.summary = summary
		this.imageSrc = imageSrc
		this.rating = rating
		this.submittedBy = submittedBy
		this.approval = approval
	}
}

module.exports = Game
