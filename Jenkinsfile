pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                echo 'Cloning NASA APOD repo...'
                git branch: 'main',
                    url: 'https://github.com/Sanketdinkarmore/Nasa-apod-react-dashboard.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                echo 'Building React app...'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to server...'
                sh '''
                    sudo mkdir -p /var/www/html/nasa-apod
                    sudo cp -r dist/* /var/www/html/nasa-apod/
                    echo "Deployed successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo 'NASA APOD app deployed successfully!'
        }
        failure {
            echo 'Build failed - check logs!'
        }
    }
}