import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

// 所有路径配置的前缀(路径配置是相对项目根路径为前提配置的)
const pathPrefix = '..';
// 打包版本号
// const appVersion = new Date().getTime();
// 网站图标绝对路径
const faviconPath = path.resolve(__dirname, `${pathPrefix}/public/images/favicon.png`);
// 项目根目录绝对路径
const rootPath = path.resolve(__dirname, `${pathPrefix}/`);
// 打包输出目录绝对路径
const distPath = path.resolve(__dirname, `${pathPrefix}/dist`);
// node_modules文件夹绝对路径
const nodeModulesPath = path.resolve(__dirname, `${pathPrefix}/node_modules`);
// public文件夹绝对路径
const publicPath = path.resolve(__dirname, `${pathPrefix}/public`);
// src文件夹绝对路径
const srcPath = path.resolve(__dirname, `${pathPrefix}/src`);
// src文件夹绝对路径
// const pagesPath = path.resolve(__dirname, `${pathPrefix}/src/pages`);

const config: Configuration = {
  entry: {
    "src/pages/index": `${srcPath}/pages/index.js`,
    "src/pages/index2": `${srcPath}/pages/index2.ts`,
    "src/pages/index3": `${srcPath}/pages/index3.tsx`,
  },
  output: {
    path: distPath,
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/"
  },
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {test: /\.json$/, use: "json-loader", type: "javascript/auto"},
      // 图片
      {
        test: /\.(png|jp?g|gif|svg|ico)$/,
        use: [{loader: "url-loader", options: {limit: 8192, name: "images/[name].[hash:8].[ext]", publicPath: ""}}]
      },
      // 字体图标
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{loader: "file-loader", options: {limit: 8192, name: "fonts/[name].[ext]?[hash:8]", publicPath: ""}}],
      },
      // 音频
      {
        test: /\.(wav|mp3|ogg)?$/,
        use: [{loader: "file-loader", options: {limit: 8192, name: "audios/[name].[ext]?[hash:8]", publicPath: ""}}],
      },
      // 视频
      {
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [{loader: "file-loader", options: {limit: 8192, name: "videos/[name].[ext]?[hash:8]", publicPath: ""}}],
      },
      // css
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "postcss-loader", options: { /*plugins: postcss.plugins,*/ sourceMap: true}}
        ],
      },
      // js、jsx
      {
        test: /\.jsx?$/,
        use: [{loader: "babel-loader", options: {cacheDirectory: true}}],
        include: [srcPath],
        exclude: /node_modules/,
      },
      // ts、tsx
      {
        test: /\.tsx?$/,
        use: [{loader: "ts-loader"}],
        include: [srcPath],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${srcPath}/pages/index.html`,
      title: "webpack4.x",
      minify: {
        removeRedundantAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        collapseBooleanAttributes: true
      },
      favicon: faviconPath,
      // appVersion: config.appVersion,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: publicPath, to: "./public"},
      ],
      options: {concurrency: 64}
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: "static",
    //   openAnalyzer: true,
    //   analyzerPort: 9528,
    //   reportFilename: "../report.html",
    // }),
    new HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [srcPath, nodeModulesPath],
    alias: {
      "@": srcPath,
    },
  },
  optimization: {
    noEmitOnErrors: true,
  },
  devServer: {
    port: 8000,
    host: "0.0.0.0",
    contentBase: `${rootPath}/index.html`,
    // publicPath: '/',
    historyApiFallback: true,
    overlay: true,
    hot: true,
    inline: true,
    noInfo: true,
    // 跳过域名检查
    disableHostCheck: false,
    // 服务端代理配置
    proxy: {},
  }
};

export default config;
