pipeline {
    agent none
    stages {
        stage("build & SonarQube Scanner") {
            agent any
            steps {
                withSonarQubeEnv('sql') {
                    sh 'mvn clean package sonar:sonar'
                }
            }
        }
    }
}