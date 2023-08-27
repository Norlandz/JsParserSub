// ;repeat; pipeline { 
// ;repeat;     agent any
// ;repeat; 
// ;repeat;     stages {
// ;repeat;         stage('Build') {
// ;repeat;             steps {
// ;repeat;                 echo 'Building, need nodejs & pnpm '
// ;repeat;                 bat 'pnpm i'
// ;repeat;             }
// ;repeat;         }
// ;repeat;         stage('Test') {
// ;repeat;             steps {
// ;repeat;                 echo 'No test'
// ;repeat;             }
// ;repeat;         } 
// ;repeat;         stage('Deploy') {
// ;repeat;             steps {
// ;repeat;                 echo 'Just run in Master directly; this starts the program in the background; <> though a proper way should just deploy to Docker / use Publish_Over_Ssh.'
// ;repeat; 
// ;repeat;                 script {
// ;repeat;                     withEnv ( ['JENKINS_NODE_COOKIE=doNotKill'] ) {
// ;repeat;                       bat 'start /b npm run dev'
// ;repeat;                     }
// ;repeat;                 }
// ;repeat; 
// ;repeat;             }
// ;repeat;         }
// ;repeat;         
// ;repeat;     }
// ;repeat; }
