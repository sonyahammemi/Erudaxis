#Author : Sonia
Feature: Bus Navigation

  Background:
    Given I open login page
    When I login with valid credentials
    Then I should be redirected to dashboard

  Scenario: Navigate to Gestion Bus
    When user opens the bus menu
    Then user is redirected to gestion bus page