Feature: Sign Up Functionality of Game Reviews Website

Scenario Outline: When the data is correct 
		Given I am on the signup page
		Then I should see Sign Up
		And I fill in "Username" with "pluto"
		And I fill in "Password" with "password"
		And I fill in "Confirm Password" with "password"
		And I press "Sign Up"
		Then I should be on login page