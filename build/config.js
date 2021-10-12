"use strict";
exports.__esModule = true;
exports.settings = void 0;
var path_1 = require("path");
var oss_config_1 = require("./oss.config");
var _a = process.env, NODE_ENV = _a.NODE_ENV, ANALYZER = _a.ANALYZER;
// webpack全局配置
var settings = {
    appVersion: new Date().getTime(),
    rootPath: path_1["default"].resolve(__dirname, "../"),
    mode: NODE_ENV === 'development' ? 'development' : 'production',
    devServer: {
        host: '127.0.0.1',
        port: 8000,
        needOpenApp: true,
        /** 打开指定页面 */
        openPage: 'dgiot_amis/schema-app.html',
        proxy: {
            '/api/': {
                target: 'https://houtai.baidu.com',
                changeOrigin: true,
                pathRewrite: { '^': '' }
            },
            '/iotapi/': {
                target: 'http://prod.iotn2n.com',
                changeOrigin: true,
                pathRewrite: { '^': '' }
            },
            '/!/': {
                target: 'http://api-dev.msvc.top',
                changeOrigin: true,
                pathRewrite: { '^': '' }
            }
        }
    },
    needAnalyzer: !!ANALYZER,
    defaultTitle: 'Dgiot Amis',
    define: {
        isProdEnv: NODE_ENV === 'production',
        enableCDN: oss_config_1.enableCDN
    }
};
exports.settings = settings;
