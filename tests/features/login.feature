Feature: Login Page

	 User should be able to log in and access user only parts

	Scenario: User logs in successfully
		Given username is 'admin' and password is 'hello'
		When I try to log in
		Then I should be logged in successfully
		Then I should be redirected to '/homepage'

	Scenario: User provides incorrect password
		Given username is 'admin' and password is 'nothello'
		When I try to log in
		Then I should be asked to try again with an error telling me the password was incorrect

	Scenario: User provides incorrect username
		Given username is 'notadmin' and password is 'hello'
		When I try to log in
		Then I should be asked to try again with an error telling me the username doesn't exist
