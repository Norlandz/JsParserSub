pipeline {
  agent {
    node {
      label 'jenkinsAgent-jdk17-docker'
    }
  }

  stages {
    stage('inside docker image') {
      agent {
        docker { 
          image 'node:20.9.0-slim' 
          args '-v /var/run/docker.sock:/var/run/docker.sock'
          reuseNode true
        }
      }

      stages {
        stage('checkout') {
          steps {
            git branch: 'main', url: 'https://github.com/Norlandz/JsParserSub' // @config[project name]
            sh 'pwd'
            sh 'ls -la'
          }
        }
        stage('setup env') {
          steps {
            sh 'node --version'
            sh 'npm --version'
            sh 'npm install -g pnpm@8.10.2'
            sh 'pnpm --version'
          }
        }
        stage('build') {
          steps {
            sh 'pnpm install'
          }
        }
        stage('test') {
          steps {
            sh 'echo "pseudo Testing"'
          }
        }
        stage('build docker image') {
          steps {
            sh 'docker build -t mindde/jsparsersub:v0.0.1 .' // @config[project name]
          }
        }
        stage('publish docker image') {
          environment {
            CredDockerhub = credentials('idVal_CredDockerhub')
          }
          steps {
            sh 'docker login -u $CredDockerhub_USR -p $CredDockerhub_PSW'
            sh 'docker push mindde/jsparsersub:v0.0.1' // @config[project name]
            sh 'docker logout'
          }
        }
      }
    }
    stage('call (async) remote server to pull & run (deploy) docker image (using watchtower)') { // watchtower will do this, no need to _ special docker trigger / publish_over_ssh _
      steps {
        sh 'echo "this curl will fail -- if watchtower is not up yet. \nwhich can happen at the first time of the whole project setup -- \n1. this script need to build the image to dockerhub \n2. docker-compose.yml file pulls the image and start up all containers \n3. watchtower will be started in that docker-compose.yml together \n-- once watchtower is up, all later builds will be able to call to watchtower no problem."'
        sh 'curl -H "Authorization: Bearer tokenVal_WATCHTOWER_HTTP_API_TOKEN_toBeSentFromJenkins" 10.15.1.137:8080/v1/update' // FIXME @config the ip address need know ahead of time?...
      }
    }
    stage('done') {
      steps {
        sh 'echo done'
        sh 'ls -la'
      }
    }
  }


}