import path from 'path';
import chalk from 'chalk';
import ip from 'ip';
import clipboardy from 'clipboardy';
import { Configuration, HashedModuleIdsPlugin, HotModuleReplacementPlugin } from 'webpack';
import WebpackMerge from 'webpack-merge';
import WebpackBar from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { settings } from './config';

// src文件夹绝对路径
const srcPath = path.resolve(settings.rootPath, "./src");
// src文件夹绝对路径
// const pagesPath = path.resolve(rootPath, `${pathPrefix}/src/pages`);
// public文件夹绝对路径
const publicPath = path.resolve(settings.rootPath, "./public");
// node_modules文件夹绝对路径
const nodeModulesPath = path.resolve(settings.rootPath, "./node_modules");
// 打包输出目录绝对路径
const distPath = path.resolve(settings.rootPath, "./dist");
// 网站图标绝对路径
const faviconPath = path.resolve(settings.rootPath, "./public/images/favicon.png");
// 访问地址复制到剪切板(只干一次)
let copyToClipboard = false;

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

// postcss-loader 配置
const postcssOptions = {
  plugins: [
    ["postcss-preset-env", {}],
    ["autoprefixer", {}],
    ["postcss-aspect-ratio-mini", {}],
    ["postcss-write-svg", {utf8: false}],
    // ["postcss-px-to-viewport", {
    //   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
    //   viewportWidth: 750,
    //   // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
    //   viewportHeight: 1334,
    //   // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    //   unitPrecision: 3,
    //   // 指定需要转换成的视窗单位，建议使用vw
    //   viewportUnit: 'vw',
    //   // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    //   selectorBlackList: ['.ignore', '.hairlines'],
    //   // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    //   minPixelValue: 1,
    //   // 允许在媒体查询中转换`px`
    //   mediaQuery: false
    // }],
  ],
};

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
    module: {
      rules: [
        // css
        {
          test: /\.css$/,
          use: [
            {loader: "cache-loader"},
            {loader: "style-loader"},
            {loader: "css-loader", options: {}},
            {loader: "postcss-loader", options: {postcssOptions: postcssOptions}},
          ],
        },
        // 编译less
        {
          test: /\.less$/,
          use: [
            {loader: "cache-loader"},
            {loader: "style-loader"},
            {loader: "css-loader", options: {importLoaders: 1, modules: {compileType: "module", localIdentName: "[path][name]_[local]", localIdentContext: srcPath}}},
            {loader: "postcss-loader", options: {postcssOptions: postcssOptions}},
            {loader: "less-loader", options: {sourceMap: true}},
          ],
        },
      ],
    },
    devServer: {
      port: settings.devServer.port,
      host: "127.0.0.1",
      contentBase: `${settings.rootPath}/index.html`,
      // publicPath: "/",
      historyApiFallback: true,
      overlay: true,
      hot: true,
      inline: true,
      noInfo: true,
      // 跳过域名检查
      disableHostCheck: false,
      // 服务端代理配置
      proxy: settings.devServer.proxy,
      open: settings.devServer.needOpenApp && "chrome",
    },
    plugins: [
      new WebpackBar({
        reporter: {
          allDone: context => {
            if (copyToClipboard) {
              return;
            }
            copyToClipboard = true;
            clipboardy.writeSync(`http://127.0.0.1:${settings.devServer.port}/`);
            const messages = [
              "  App running at:",
              `  - Local:   ${chalk.cyan(`http://127.0.0.1:${settings.devServer.port}/`)} (copied to clipboard)`,
              `  - Network: ${chalk.cyan(`http://${ip.address("public", "ipv4")}:${settings.devServer.port}/`)}`
            ];
            console.log(messages.join("\n"));
          },
        },
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
      filename: "[name].[chunkhash].bundle.js",
      chunkFilename: "[name].[chunkhash].chunk.js",
      publicPath: "/"
    },
    mode: "production",
    module: {
      rules: [
        // css
        {
          test: /\.css$/,
          use: [
            {loader: "cache-loader"},
            MiniCssExtractPlugin.loader,
            {loader: "style-loader"},
            {loader: "css-loader", options: {modules: true, localIdentName: "[path]-[name]-[local]-[hash:base64:5]"}},
            {loader: "postcss-loader", options: {postcssOptions: postcssOptions}},
          ],
        },
        // 编译less
        {
          test: /\.less$/,
          use: [
            {loader: "cache-loader"},
            MiniCssExtractPlugin.loader,
            {loader: "css-loader", options: {importLoaders: 1, modules: {compileType: "module", localIdentName: "[path][name]_[local]_[hash:base64:5]", localIdentContext: srcPath}}},
            {loader: "postcss-loader", options: {postcssOptions: postcssOptions}},
            {loader: "less-loader", options: {}},
          ],
        },
      ],
    },
    plugins: [
      new HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[name].[hash].css",
      }),
      new CleanWebpackPlugin({}),
    ],
    optimization: {
      moduleIds: "hashed",
      runtimeChunk: {
        name: "manifest",
      },
      minimizer: [
        new TerserPlugin({parallel: true}),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            name: "commons",
            chunks: "all",
            // 表示被引用次数，默认为1。Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
            // minChunks: Math.ceil(config.pagesConfig.length / 3),
            // 表示抽取出来的文件在压缩前的最小大小，默认为 30000
            minSize: 30000,
            // 来设置优先级
            priority: 0,
          },
          // 提取 node_modules 中代码
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
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
