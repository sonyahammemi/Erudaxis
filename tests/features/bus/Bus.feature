#Author : Sonia
Feature: Bus Navigation

  Background:
    Given I open login page
    When I login with valid credentials
    Then I should be redirected to dashboard
    When user opens the bus menu
    Then user is redirected to gestion bus page


    Scenario: Add, modify and delete bus
    When user clicks on "bus" 
    And user adds a new bus with Numéro de Bus "B-001", Numéro d'Immatriculation "200 TN 2278", Numéro de Carte Grise "CG-2024-004", Numéro de Carte Carburant "FC-004", Type de Bus "Minibus", Capacite "25", Chauffeur "Foulen BenFoulen"
  
    And user modifies the bus number "B-001" new driver to "Amine test"
    Then user deletes the bus "B-001"