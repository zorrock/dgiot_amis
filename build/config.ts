import path from "path";
import { ProxyConfigMap } from 'webpack-dev-server';

const {NODE_ENV, ANALYZER} = process.env;

interface Settings {
  /** 打包版本号 */
  appVersion: string | number;
  /** 项目根目录绝对路径 */
  rootPath: string;
  /** 运行模式 */
  mode: "development" | "production",
  /** dev服务配置 */
  devServer: {
    /** devServer 端口 */
    port: number;
    /** dev时是否需要自动打开浏览器 */
    needOpenApp: boolean;
    /** 后端接口代理配置 */
    proxy?: ProxyConfigMap;
  };
  /** 需要 Analyzer */
  needAnalyzer: boolean;
  /** HTML页面默认标题 */
  defaultTitle: string;
  /** */
}


const settings: Settings = {
  appVersion: new Date().getTime(),
  rootPath: path.resolve(__dirname, `../`),
  mode: NODE_ENV === "development" ? "development" : "production",
  devServer: {
    port: 8000,
    needOpenApp: false,
    proxy: {
      '/api/': {
        target: 'https://houtai.baidu.com',
        changeOrigin: true,
        pathRewrite: {'^': ''},
      }
    },
  },
  needAnalyzer: !!ANALYZER,
  defaultTitle: "Tab页",
}

export { settings };
