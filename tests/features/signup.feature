Feature: Sign Up Functionality of Game Reviews Website
	The user should be able to sign up to the webpage

	Scenario: User sign ups sucessfully 
		Given The browser is open on the signup page
		When I fill in username with 'pluto'
		When I fill in password with 'password' 
		When I fill in confirm password with 'password'
		When I press Sign Up
		Then I should be redirected to 'homepage' and signed in successfully
