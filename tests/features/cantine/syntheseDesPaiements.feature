#Author : Sonia
Feature: Cantine Navigation

Background:
    Given I open login page
    When I login with valid credentials
    Then I should be redirected to dashboard
    When user opens the cantine menu
    Then user is redirected to gestion cantine page

Scenario: Synthèse des paiements
    When user clicks on menu "Synthèse des paiements"
    And user searches for a bill
    And a bill is displayed
    And user selects a meal
    And user clicks "Marquer comme payé"
    And confirms the payment
    Then user is redirected to synthèse des paiements