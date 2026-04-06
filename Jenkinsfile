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
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps chromium'
            }
        }

        stage('Tests') {
            steps {
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'npm test'
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