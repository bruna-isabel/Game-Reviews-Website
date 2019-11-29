Feature: Approving Games and Reviews
	The admin should be able to approve or reject games and reviews.

	Scenario: Admin approves a game
		Given The browser is open on the approval/games page
		When I find the game I want to approve
		And I click on the approve button
		Then I should no longer be able to see the game in the approval/games page
		And I should be able to find the game in the list page

	Scenario: Admin rejects a game
		Given The browser is open on the approval/games page
		When I find the game I want to reject
		And I click on the reject button
		Then I should no longer be able see the game in the approval/games page
		And I shouldn't be able to find the game in the list page

	Scenario: Admin approves a review
		Given The browser is open on the approval/reviews page
		When I find the review I want to approve
		And I click on the approve button
		Then I should no longer be able to see the review in the approval/reviews page
		And I should be able to find the review in the gam'es individual page

	Scenario: Admin rejects a review
		Given The browser is open on the approval/reviews page
		When I find the review I want to reject
		And I click on the reject button
		Then I should no longer be able to see the review in the approval/reviews page
		And I shouldn't be able to find the review in the gam'es individual page