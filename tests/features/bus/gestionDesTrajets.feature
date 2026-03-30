#Author : Sonia
Feature: Bus Navigation

  Background:
    Given I open login page
    When I login with valid credentials
    Then I should be redirected to dashboard
    When user opens the bus menu
    Then user is redirected to gestion bus page


  Scenario: Add, modify and delete des trajets
    When user clicks on "gestion des trajets" for gestion des trajets
    And user adds a new route with date of the route "05/03/2026", heure de départ "16:00", point de départ "Centre ville", destination "ariana soghra", bus affecté "B-002" and click "Ajouter le trajet"
    And user adds a new student "eleve test" to bus number "B-002" from class "classe 1ere DevOps"
    And user modifies the time "13:00" of the bus number "B-002"
    Then user deletes the bus route "B-002"
    
    