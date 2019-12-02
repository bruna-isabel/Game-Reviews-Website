Feature: Sign Up Functionality of Game Reviews Website
	The user should be able to sign up to the webpage

	Scenario: User sign ups sucessfully 
		Given The browser is open on the signup page
		When I fill in username with 'plutoooo'
		When I fill in password with 'Password1!' 
		When I fill in confirm password with 'Password1!'
		When I press Sign Up
		Then I should be signup successfully
		Then I should be redirected to login

	Scenario: User inputs invalid username
		Given The browser is open on the signup page
		When I fill in username with 'plu'
		When I fill in password with 'Password1!' 
		When I fill in confirm password with 'Password1!'
		When I press Sign Up
		Then I should get an error on why the username was invalid and render sign up page

	Scenario: User inputs invalid password
		Given The browser is open on the signup page
		When I fill in username with 'pluto'
		When I fill in password with 'password' 
		When I fill in confirm password with 'password'
		When I press Sign Up
		Then I should get an error on why the password was invalid and render sign up page
	
	Scenario: User inputs different for password and confirm password
		Given The browser is open on the signup page
		When I fill in username with 'pluto'
		When I fill in password with 'Password1!' 
		When I fill in confirm password with 'password'
		When I press Sign Up
		Then I should get an error that password and confirm password do not match

