'use strict'

class Review {
	// eslint-disable-next-line max-params
	constructor(user, game, reviewScore, reviewText, reviewDate, approved) {
		this.id = -1
		this.user = user
		this.game = game
		this.reviewScore = reviewScore
		this.reviewText = reviewText
		this.reviewDate = reviewDate
		this.approved = approved
	}
}

module.exports = Review
