import path from 'path';
import { Configuration, DllPlugin } from 'webpack';
import { settings } from './config';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

// dll 输出目录
const dllPath = path.resolve(settings.rootPath, "./dll");

// export const editorFileReg = /[\\/]amis[\\/]lib[\\/]components[\\/]Editor\.js/
// export const videoFileReg = /[\\/]amis[\\/]lib[\\/]renderers[\\/]Video\.js/
// export const froalaEditorReg = /[\\/]amis[\\/]lib[\\/]components[\\/]RichText\.js/
// export const factoryFileReg = /[\\/]amis[\\/]lib[\\/]factory\.js/
// export const apiUtilReg = /[\\/]amis[\\/]lib[\\/]utils[\\/]api\.js/
// export const bootstrapCss = /[\\/]bootstrap[\\/]dist[\\/]css[\\/]bootstrap.css/

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
    // react: ["react"],
    // "react_dom": ["react-dom"],
    "amis": ["amis"],
    // vendor: [
    //   "react",
    //   "react-router-dom",
    //   "immer",
    //   "styled-components",
    //   "whatwg-fetch",
    //   "qs",
    //   "amis",
    //   "lodash",
    //   "bootstrap/dist/js/bootstrap.bundle.js",
    //
    //   "bootstrap/dist/css/bootstrap.css",
    //   "animate.css/animate.css",
    //   "font-awesome/css/font-awesome.css",
    //   "react-datetime/css/react-datetime.css",
    //   "video-react/dist/video-react.css",
    //   "cropperjs/dist/cropper.css",
    //   "tinymce/skins/ui/oxide/skin.css",
    //   "froala-editor/css/froala_style.min.css",
    //   "froala-editor/css/froala_editor.pkgd.min.css",
    // ],
  },
  output: {
    pathinfo: false,
    path: dllPath,
    filename: "[name]_[hash:6].dll.js",
    library: "[name]_[hash:6]",
    chunkFilename: "chunk_[name]_[chunkhash:6].js",
    publicPath: "/",
  },
  mode: 'production',
  devtool: "eval-source-map",
  module: {
    rules: [
      // 图片
      {
        test: /\.(png|jp?g|gif|svg|ico)$/,
        use: [{loader: "url-loader", options: {limit: 8192, name: "images/[name].[hash:8].[ext]", publicPath: ""}}],
        // exclude: [/[\\/]qs\//, /[\\/]icons[\\/]/],
      },
      // 字体图标
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{loader: "file-loader", options: {limit: 8192, name: "fonts/[name].[ext]?[hash:8]", publicPath: ""}}],
        // exclude: [/[\\/]qs\//, /[\\/]icons[\\/]/],
      },
      // css
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader", options: {}},
          {loader: "postcss-loader", options: {postcssOptions: postcssOptions}},
        ],
        // exclude: [bootstrapCss],
      },
      // {
      //   test: bootstrapCss,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {loader: "css-loader", options: {}},
      //     // {
      //     //   loader: 'string-replace-loader',
      //     //   options: {
      //     //     multiple: [
      //     //       {search: 'a\\:not\\(\\[href\\]\\)', flags: 'gm', replace: '.ignore-anothref'},
      //     //       {search: 'svg \\{', flags: 'gm', replace: '.ignore-svg {'}],
      //     //   },
      //     // },
      //   ],
      // },
      // js、jsx
      {
        test: /\.jsx?$/,
        use: [
          {loader: "thread-loader", options: {workers: 3}},
          {loader: "babel-loader", options: {cacheDirectory: true}},
        ],
        // exclude: [editorFileReg, factoryFileReg, froalaEditorReg, videoFileReg, apiUtilReg],
      },
      // ts、tsx
      {
        test: /\.tsx?$/,
        use: [
          {loader: "thread-loader", options: {workers: 3}},
          {loader: "ts-loader", options: {happyPackMode: true, transpileOnly: true}},
        ],
        // exclude: [editorFileReg, factoryFileReg, froalaEditorReg, videoFileReg, apiUtilReg],
      },
      // {
      //   test: editorFileReg,
      //   use: [
      //     {loader: "babel-loader", options: {cacheDirectory: true}},
      //     amis.fixEditorLoader({ publicPath }),
      //   ],
      // },
      // {
      //   test: factoryFileReg,
      //   use: [babelLoader, amis.fixFactoryLoader()],
      // },
      // {
      //   test: froalaEditorReg,
      //   use: [babelLoader, amis.fixFroalaLoader()],
      // },
      // {
      //   test: videoFileReg,
      //   use: [babelLoader, amis.fixVideoLoader()],
      // },
      // {
      //   test: apiUtilReg,
      //   use: [babelLoader, amis.fixApiUtilLoader()],
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: "[name]_[hash:6].css",
      chunkFilename: "chunk_[name]_[chunkhash:6].css",
    }),
    new DllPlugin({
      path: `${dllPath}/[name]-manifest.json`,
      name: "[name]_[hash:6]",
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 9528,
      analyzerMode: "static",
      openAnalyzer: true,
      reportFilename: `${settings.rootPath}/out/report-dll.html`,
    })
  ],
  performance: {},
  optimization: {
    minimizer: [
      new TerserPlugin({parallel: true}),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
}

export default config;
