import path from 'path';
import chalk from 'chalk';
import ip from 'ip';
import clipboardy from 'clipboardy';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import WebpackMerge from 'webpack-merge';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
// import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { settings } from './config';

// src文件夹绝对路径
const srcPath = path.resolve(settings.rootPath, './src');
// src文件夹绝对路径
// const pagesPath = path.resolve(rootPath, `${pathPrefix}/src/pages`);
// public文件夹绝对路径
const publicPath = path.resolve(settings.rootPath, './public');
// node_modules文件夹绝对路径
const nodeModulesPath = path.resolve(settings.rootPath, './node_modules');
// 打包输出目录绝对路径
const distPath = path.resolve(settings.rootPath, './dist');
// 网站图标绝对路径
const faviconPath = path.resolve(settings.rootPath, './public/images/favicon.png');

let config: Configuration = {
  entry: {
    "src/pages/index": `${srcPath}/pages/index.js`,
    "src/pages/index2": `${srcPath}/pages/index2.ts`,
    "src/pages/index3": `${srcPath}/pages/index3.tsx`,
  },
  module: {
    // noParse: content => {},
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
          {loader: "cache-loader"},
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "postcss-loader", options: { /*plugins: postcss.plugins,*/ sourceMap: true}},
        ],
      },
      // js、jsx
      {
        test: /\.jsx?$/,
        use: [
          {loader: "cache-loader"},
          {loader: "thread-loader", options: {workers: 3}},
          {loader: "babel-loader", options: {cacheDirectory: true}},
        ],
        include: [srcPath],
        exclude: /node_modules/,
      },
      // ts、tsx
      {
        test: /\.tsx?$/,
        use: [
          {loader: "cache-loader"},
          {loader: "thread-loader", options: {workers: 3}},
          // {loader: "babel-loader", options: {cacheDirectory: true}},
          {loader: "ts-loader", options: {happyPackMode: true, transpileOnly: true}},
        ],
        include: [srcPath],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HardSourceWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: `${srcPath}/pages/index.html`,
      filename: `${distPath}/src/pages/index.html`,
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
};

// 动态扫描入口文件

// 开发模式
if (settings.mode === "development") {
  const devConfig: Configuration = {
    output: {
      path: distPath,
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js",
      publicPath: "/",
    },
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      port: settings.devServer.port,
      host: "127.0.0.1",
      contentBase: `${settings.rootPath}/index.html`,
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
      open: settings.devServer.needOpenApp && "chrome",
    },
    plugins: [
      new WebpackBar({
        reporter: {
          allDone: context => {
            clipboardy.writeSync(`http://127.0.0.1:${settings.devServer.port}/`);
            const messages = [
              "  App running at:",
              `  - Local:   ${chalk.cyan(`http://127.0.0.1:${settings.devServer.port}/`)} (copied to clipboard)`,
              `  - Network: ${chalk.cyan(`http://${ip.address("public", "ipv4")}:${settings.devServer.port}/`)}`
            ];
            console.log(messages.join("\n"));
          }
        }
      }),
      new HotModuleReplacementPlugin(),
    ],
  };
  config = WebpackMerge(config, devConfig);
}

// 生产模式
if (settings.mode === "production") {
  const prodConfig: Configuration = {
    output: {
      path: distPath,
      filename: '[name].[chunkhash].bundle.js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      publicPath: "/"
    },
    mode: "production",
    plugins: [
      new CleanWebpackPlugin({}),
    ],
    optimization: {
      minimizer: [
        // new TerserPlugin({parallel: true}),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'all',
            // 表示被引用次数，默认为1。Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
            // minChunks: Math.ceil(config.pagesConfig.length / 3),
            // 表示抽取出来的文件在压缩前的最小大小，默认为 30000
            minSize: 30000,
            // 来设置优先级
            priority: 0,
          },
          // 提取 node_modules 中代码
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10,
          },
        },
      },
    },
  };
  config = WebpackMerge(config, prodConfig);
}

// 生成代码分析报告
if (settings.needAnalyzer) {
  config.plugins!.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 9528,
      analyzerMode: "static",
      openAnalyzer: true,
      reportFilename: `${settings.rootPath}/out/report.html`,
    })
  );
}

export default config;
