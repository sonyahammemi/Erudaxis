#Author : Sonia
Feature: Bus Navigation

  Background:
    Given I open login page
    When I login with valid credentials
    Then I should be redirected to dashboard
    When user opens the bus menu
    Then user is redirected to gestion bus page

  Scenario: Add, modify and delete chauffeur
    When user clicks on "Chauffeurs" button
    And user adds a new chauffeur with Prénom "Ahmed", Nom "BenAli", Email "Ahmed.BenAli@example.com", CIN "11345678", Numéro de Téléphone "223456789", Adresse "123 Rue Principale", Pays "Tunisia", Ville "Tunis"
    And user validates the creation of chauffeur
    And user modifies the chauffeur name "Ahmed" to "Mohamed"
    Then user deletes the chauffeur "Mohamed"

  
    