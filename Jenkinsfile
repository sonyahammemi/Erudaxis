pipeline {
    agent any

    tools {
        allure 'allure'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Tests') {
            steps {
                // Nettoie les anciens résultats avant le run
                sh 'rm -rf allure-results'
                sh 'npm test'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
        }

        failure {
            echo 'Tests échoués — voir le rapport Allure'
        }

        success {
            echo 'Tous les tests sont passés ✅'
        }
    }
}