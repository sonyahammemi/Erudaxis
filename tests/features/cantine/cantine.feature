#Author : Sonia
Feature: Cantine Navigation

  Background:
    Given I open login page
    When I login with valid credentials
    Then I should be redirected to dashboard

  Scenario: Navigate to Gestion Cantine
    When user opens the cantine menu
    Then user is redirected to gestion cantine page