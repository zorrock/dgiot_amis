import * as LiveServer from 'live-server';
import lodash from 'lodash';
import { settings } from '../build/config';

const params = {
  port: settings.devServer.port,
  host: "0.0.0.0",
  root: `${settings.rootPath}/dist`,
  open: false,
  wait: 1000,
  logLevel: 2,
  proxy: [],
};

// --proxy=/api/client/get_config:http://localhost:8081/api/client/get_config
lodash.forEach(settings.devServer.proxy!, (proxyValue, proxyKey) => {
  // @ts-ignore
  params.proxy.push([proxyKey, proxyValue.target]);
})

LiveServer.start(params as LiveServer.LiveServerParams);
