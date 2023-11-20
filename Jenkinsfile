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
          image 'node@sha256:c325fe5059c504933948ae6483f3402f136b96492dff640ced5dfa1f72a51716' // https://hub.docker.com/layers/library/node/20.9.0-slim/images/sha256-c325fe5059c504933948ae6483f3402f136b96492dff640ced5dfa1f72a51716?context=explore
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
        script {
          sh '''\
          echo "this curl will fail -- if watchtower is not up yet. 
            which can happen at the first time of the whole project setup -- 
            1. this script need to build the image to dockerhub 
            2. docker-compose.yml file pulls the image and start up all containers 
            3. watchtower will be started in that docker-compose.yml together 
            -- once watchtower is up, all later builds will be able to call to watchtower no problem."
          '''.stripIndent()

          def ipAddr_MainApp_withWatchtower = "10.14.1.11" // "mainApp.rff.com" // FIXME @config need use Dns instead of a fixed ip
          sh """
          curl -H "Authorization: Bearer tokenVal_WATCHTOWER_HTTP_API_TOKEN_toBeSentFromJenkins" --max-time 20 --location http://${ipAddr_MainApp_withWatchtower}:8686/v1/update
          """ 
        }
      }
    }
    stage('clean up docker image volume') { 
      steps {
        sh 'yes | docker system prune'
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