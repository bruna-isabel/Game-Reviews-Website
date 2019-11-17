'use strict'

class Review {
	constructor(user, game, review_score, review_text, review_date, approved) {
		this.id = -1
		this.user = user
		this.game = game
		this.review_score = review_score
		this.review_text = review_text
		this.review_date = review_date
		this.approved = approved
	}
}

module.exports = Review
