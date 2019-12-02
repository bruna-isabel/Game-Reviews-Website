Feature: Approving Games and Reviews
	The admin should be able to approve or reject games and reviews.

	Scenario: Admin approves a game
		Given I log in as username 'admin', password 'hello'
		When game is 'gameApprove'
		Then I approve
		Then I should be able to find the game in the list page

	Scenario: Admin rejects a game
		Given I log in as username 'admin', password 'hello'
		When game is 'gameReject'
		Then I reject 
		Then I should not be able to find the game in the list page

	Scenario: Admin approves a review
		Given I log in as username 'admin', password 'hello'
		When review is 'reviewApprove'
		Then I approve
		Then I should be able to find the review in the games individual page

	Scenario: Admin rejects a review
		Given I log in as username 'admin', password 'hello'
		When review is 'reviewReject'
		Then I reject
		Then I should not be able to find the review in the games individual page
