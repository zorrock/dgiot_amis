import path from 'path';
import { Configuration, DllPlugin } from 'webpack';
import { settings } from './config';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// dll 输出目录
const dllPath = path.resolve(settings.rootPath, "./dll");

// postcss-loader 配置
const postcssOptions = {
  plugins: [
    ["postcss-preset-env", {}],
    ["autoprefixer", {}],
    ["postcss-aspect-ratio-mini", {}],
    ["postcss-write-svg", {utf8: false}],
  ],
};

const config: Configuration = {
  entry: {
    vendor: [
      "lodash", "qs", "react", "react-dom", "amis",
    ],
  },
  output: {
    // libraryTarget: "commonjs",
    path: dllPath,
    filename: "[name].dll.js",
    chunkFilename: "chunk_[name]_[chunkhash:6].js",
    library: "[name]",
  },
  mode: "production",
  module: {
    rules: [
      // 图片
      {
        test: /\.(png|jp?g|gif|svg|ico)$/,
        use: [{loader: "url-loader", options: {limit: 8192, name: "images/[name].[hash:8].[ext]", publicPath: ""}}],
      },
      // 字体图标
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{loader: "file-loader", options: {limit: 8192, name: "fonts/[name].[ext]?[hash:8]", publicPath: ""}}],
      },
      // js、jsx
      {
        test: /\.jsx?$/,
        use: [
          {loader: "thread-loader", options: {workers: 3}},
          {loader: "babel-loader", options: {cacheDirectory: true}},
        ],
      },
      // ts、tsx
      {
        test: /\.tsx?$/,
        use: [
          {loader: "thread-loader", options: {workers: 3}},
          {loader: "ts-loader", options: {happyPackMode: true, transpileOnly: true}},
        ],
      },
      // css
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader", options: {}},
          {loader: "postcss-loader", options: {postcssOptions: postcssOptions}},
        ],
      },
      // 编译less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader", options: {}},
          {loader: "postcss-loader", options: {postcssOptions: postcssOptions}},
          {loader: "less-loader", options: {}},
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "chunk_[name]_[chunkhash:6].css",
    }),
    new DllPlugin({
      context: settings.rootPath,
      name: "[name]",
      path: `${dllPath}/[name]-manifest.json`,
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 9528,
      analyzerMode: "static",
      openAnalyzer: true && false,
      reportFilename: `${settings.rootPath}/out/report-dll.html`,
    }),
  ],
  performance: {},
  optimization: {
    minimizer: [
      new TerserPlugin({parallel: true}),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      maxInitialRequests: Infinity,
      automaticNameDelimiter: "_",
      cacheGroups: {
        default: false,
        vendors: false,
        monacoLanguages: {
          chunks: "async",
          name: "monaco_languages",
          test: /monaco-editor[\\/].*language/,
          priority: 10,
          minChunks: 1,
        },
      },
    },
  },
}

export default config;
