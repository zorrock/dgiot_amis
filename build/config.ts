import path from "path";

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
  },
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
  },
  needAnalyzer: !!ANALYZER,
}

export { settings };


// // 代理配置
// const proxy = {
//   // '/api': {
//   //   target: 'http://localhost:3000',
//   //   pathRewrite: {
//   //     '^/api': ''
//   //   }
//   // }
// };
//
// // webpack.prod.conf 中的 splitChunks.cacheGroups 扩展
// const extCacheGroups = {
//   // commons: {
//   //   name: 'commons',
//   //   chunks: 'all',
//   //   // 表示被引用次数，默认为1
//   //   minChunks: 2,
//   //   // 表示抽取出来的文件在压缩前的最小大小，默认为 30000
//   //   minSize: 30000,
//   //   // 来设置优先级
//   //   priority: 0,
//   // },
// };
