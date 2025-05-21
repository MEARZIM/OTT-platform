/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    environment {
        DEPLOY_DIR = "${env.WORKSPACE}/backend"
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'master', url: 'https://github.com/MEARZIM/OTT-platform.git'
            }
        }

        stage('Build & Deploy Backend') {
            steps {
                dir("${DEPLOY_DIR}") {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    withCredentials([file(credentialsId: 'f5d353e7-ac15-4355-b801-ab9113160bdc', variable: 'ENV_FILE')]) {
                        /* groovylint-disable-next-line NestedBlockDepth */
                        script {
                            sh 'cp $ENV_FILE node/.env'
                            sh 'cp $ENV_FILE python-ml/.env'
                            sh 'docker-compose down'
                            sh 'docker-compose up --build -d'
                        }
                    }
                }
            }
        }

        stage('Check Deployment') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Backend deployment completed successfully.'
        }
        failure {
            echo '❌ Backend deployment failed.'
        }
    }
}
