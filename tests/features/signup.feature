Feature: Sign Up Functionality of Game Reviews Website
	The user should be able to sign up to the webpage

	Scenario: User sign ups sucessfully 
		Given The browser is open on the signup page
		When I fill in username with 'pluto'
		When I fill in password with 'password' 
		When I fill in confirm password with 'password'
		When I press Sign Up
		Then I should be redirected to 'homepage' and signed in successfully

	Scenario: User provides invalid username
		Given The browser is open on the signup page
		When I fill in username with not 'admin'
		When I fill password with 'password'
		When I fill confirm password with 'password'
		When I press Sign Up
		Then I should get and error message on why username is invalid

	Scenario: User provides invalid password
		Given I fill in username with 'pluto', password with 'pass' and confirm password with 'pass'
		When I press 'Sign Up'
		Then I should get and error message on why password is invalid