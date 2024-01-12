pipeline {
    agent any

    environment {
        SONAR_TOKEN= 'cd607ae23cd1a37d82b3f70caca3d5e1c25200de'
        SONAR_HOST_URL= 'https://chenar.metamovelabs.io
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
                    withSonarQubeEnv('SonarQube Server') {
                        def scannerHome = tool 'SonarQube Scanner'
                        env.PATH = "${scannerHome}/bin:${env.PATH}"

                        sh 'npm install'

                        sh "sonar-scanner -Dsonar.login=${SONAR_TOKEN} -Dsonar.host.url=${SONAR_HOST_URL}"
                    }
                }
            }
        }

        stage('Check SonarQube Results') {
            steps {
                script {
                    def sonarQubeOutcome = sh(script: 'curl -s -u ${SONAR_TOKEN}: -X GET ${SONAR_HOST_URL}/api/qualitygates/project_status?projectKey=${env.BUILD_TAG} | jq -r .projectStatus.status', returnStatus: true).trim()

                    if (sonarQubeOutcome == 'ERROR' || sonarQubeOutcome == 'FAILED') {
                        echo "Security scan failed. Check SonarQube for details."

                        // Add commands to send an email notification
                        // Example using `sendmail`:
                        //echo "Subject: Security Scan Failed" | sendmail eng.faridqattali@gmail.com

                        error "Security scan failed."
                    } else {
                        echo "Security scan passed. No vulnerabilities found."
                    }
                }
            }
        }
    }
}
