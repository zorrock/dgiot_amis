pipeline {
  agent any

  environment {
    Ali_OSS_KEY = credentials('Ali_OSS_KEY')
    Ali_OSS_SECRET = credentials('Ali_OSS_SECRET')
  }

  // tools {}

  options {
    // 保留最近历史构建记录的数量
    buildDiscarder(logRotator(numToKeepStr: '8'))
    // 不允许同时执行 pipeline
    disableConcurrentBuilds()
    // 跳过默认的git Checkout
    skipDefaultCheckout()
    // 设置 pipeline 运行的超时时间
    timeout(time: 8, unit: 'MINUTES')
    // 在失败时, 重新尝试整个 pipeline 的指定次数
    // retry(3)
    // 控制台输出时间
    timestamps()
  }

  triggers {
    // Jenkins 会检查新的源代码更新。如果存在更改, pipeline 就会被重新触发
    pollSCM('H/5 * * * *')
  }

  // parameters {}

  stages {
    stage('git-clone') {
      steps {
        checkout scm
      }
    }

    stage('构建amis-admin') {
      steps {
        sh 'yarn install --prefer-offline'
        sh 'yarn cross-env TS_NODE_PROJECT="./build/webpack.tsconfig.json" ENABLE_CDN=true OSS_KEY="$Ali_OSS_KEY" OSS_SECRET="$Ali_OSS_SECRET" NODE_ENV=production webpack --config build/webpack.conf.ts'
      }
    }

    stage('构建server模块') {
      steps {
        dir('./server') {
          sh 'yarn install --prefer-offline'
        }
      }
    }
  }

  post {
    always {
      echo '项目构建完成'
    }
    failure {
      script {
        mail
          subject: "[Jenkins] ${currentBuild.fullDisplayName}",
          body: '构建失败: ${env.BUILD_URL}',
          mimeType: 'text/html',
          to: 'lzw1000000@163.com',
          replyTo: '1183409807@qq.com'
      }
    }
    success {
      script {
        emailext
          subject: "[Jenkins] ${currentBuild.fullDisplayName}",
          body: '构建成功: ${env.BUILD_URL}',
          mimeType: 'text/html',
          to: 'lzw1000000@163.com,mlrsyz@vip.qq.com',
          replyTo: '1183409807@qq.com'
      }
    }
  }
}
