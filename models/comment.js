'use strict'

class Comment {
	// eslint-disable-next-line max-params
	constructor(gameID, reviewID, user, commentDate, commentTime, commentText) {
		this.id = -1
		this.gameID = gameID
		this.reviewID = reviewID
		this.user = user
		this.commentDate = commentDate
		this.commentTime = commentTime
		this.commentText = commentText
	}
}

module.exports = Comment
