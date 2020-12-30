// 代理配置
const proxyConfig = {
  // 默认的代理地址
  default: 'http://172.18.1.1:18080',
  // 代理配置 - 可以配置多个
  proxy: {
    app1: 'http://172.18.1.1:18080',
  },
}

exports.proxyConfig = proxyConfig;
