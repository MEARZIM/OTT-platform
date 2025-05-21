/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    environment {
        DEPLOY_DIR = "${env.WORKSPACE}/backend"
    }

    tools {
        nodejs 'node'
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
                    script {
                        sh 'docker-compose down'
                        sh 'docker-compose up --build -d'
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
