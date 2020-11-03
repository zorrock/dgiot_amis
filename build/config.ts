import path from "path";
import { ProxyConfigMap } from 'webpack-dev-server';

const {NODE_ENV, ANALYZER, USE_DLL} = process.env;

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
  /** dev是否使用dll加速编译 */
  devUseDll: boolean;
  /** 需要 Analyzer */
  needAnalyzer: boolean;
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
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {'^': ''},
      }
    },
  },
  devUseDll: !!USE_DLL,
  needAnalyzer: !!ANALYZER,
}

export { settings };
