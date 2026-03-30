
@InvalidCredentials
Feature: Login avec identifiants invalides

    Background:
        Given I open login page

    Scenario Outline: Login avec identifiants invalides
        When I login with email "<email>" and password "<password>"
        Then I should see an error message
        And I should not be redirected to dashboard

    Examples:
        | description                         | email                    | password           |
        | email sans @                        | sonya.hammemi@gmail.com  | Sonia@2026!        |
        | email valide + mauvais mdp majusc   | sonya.hammemii@gmail.com | SONIA@2026!        |
        #| email valide + bon mdp (inexistant) | sonya.hammemii@gmail.com | Sonia@2026!        |
        #| email vide                          |                          | Sonia@2026!        |
        #| mot de passe vide                   | sonya.hammemii@gmail.com |                    |
        #| les deux vides                      |                          |                    |
        #| email avec espaces                  | sonya @gmail.com         | Sonia@2026!        |
        #| mot de passe trop court             | sonya.hammemii@gmail.com | abc                |
        #| injection SQL dans email            | admin'--@test.com        | Sonia@2026!        |
        #| injection XSS dans password         | sonya.hammemii@gmail.com | <script>x</script> |
