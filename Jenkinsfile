pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')  // You need to configure a SonarQube Token credential in Jenkins
        SONAR_HOST_URL = 'https://chenar.metamovelabs.io'  // Replace with your SonarQube server URL
    }

    stages {
        stage('Checkout code') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Scan') {
            steps {
                script {
                    withSonarQubeEnv('sql') {
                        def scannerHome = tool 'SonarQube Scanner'
                        env.PATH = "${scannerHome}/bin:${env.PATH}"
                        sh "sonar-scanner -Dsonar.login=${SONAR_TOKEN} -Dsonar.host.url=${SONAR_HOST_URL}"
                    }
                }
            }
        }
    }
}
