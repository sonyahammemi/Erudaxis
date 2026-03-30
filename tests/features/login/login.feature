#Author : Sonia
@login
Feature: Login
  Scenario: Successful login
    Given I open login page
    When I login with valid credentials
    Then I should be redirected to dashboard