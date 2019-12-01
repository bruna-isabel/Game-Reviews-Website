Feature: Adding games
	The user should be able to add a new game to the webpage

	Scenario: Add a game via webpage
		Given I am logged in as user "admin" with password "hello"
		Given The browser is open on the adding game page
		When I enter "game1" on the "title" field
		When I enter "On the way to a magic world" on the "slugline" field
		When I enter "A game fool of excitting wolds to discover" on the "summary" field
		When I enter "21/08/2015" on the "releaseDate" field
		When I enter "Marco Dievo" on the "developer" field
		When I enter "Devi Corner" on the "publisher" field
		When I upload "../examples/serve/example.jpg" in the "splash" field
		When I upload "../examples/serve/example.jpg" in the "poster" field
		When I submit the form
		When game is approved by admin
		Then the game should be added to the webpage
