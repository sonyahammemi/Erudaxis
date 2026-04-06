#Author : Sonia
Feature: Gestion Cantine - Meal Management

  Background:
    Given I open login page
    When I login with valid credentials
    Then I should be redirected to dashboard
    When user opens the cantine menu
    Then user is redirected to gestion cantine page

  Scenario: Add, modify and delete meal
    When user adds a new meal with Nom du repas "Pizza Margherita", Categorie "Dîner", Emoji "🍕", Date "", Description "Délicieux", Prix "10", Quantité "12"
    And user modifies the meal "Pizza Margherita" to new name "Pizza Modifiée"
    And user deletes the meal name "Pizza Modifiée"
    Then the meal should not exist anymore