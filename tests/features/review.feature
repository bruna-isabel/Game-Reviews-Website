Feature: Adding Reviews
	User should be able to add a rating and review for any given game

	Scenario: Add a review for a game
		Given I am logged in as user "admin" with password "hello"
		Given the browser is open on the page for "The Last of Us"
		When I click on the Rate and Review button
		When I click on a 4 star rating
		When I enter "This is an excellent game" in the text area
		When I submit the review
		When review is approved by admin
		Then the review should be added and I should be redirected to the page for "The Last of Us"