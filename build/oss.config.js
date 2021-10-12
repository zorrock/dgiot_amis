"use strict";
exports.__esModule = true;
exports.cdnPublicPath = exports.aliOssConf = exports.enableCDN = void 0;
var secret_config_1 = require("./secret.config");
var dayjs_1 = require("dayjs");
var ENABLE_CDN = process.env.ENABLE_CDN;
// 是否启用CDN
var enableCDN = "" + ENABLE_CDN === 'true';
exports.enableCDN = enableCDN;
/**
 * 静态资源上次阿里OSS配置
 */
var aliOssConf = {
    /** OSS region */
    region: 'oss-cn-hangzhou',
    /** OSS access KeyId */
    accessKeyId: secret_config_1.ossSecretConfig.accessKeyId,
    /** OSS access KeySecret */
    accessKeySecret: secret_config_1.ossSecretConfig.accessKeySecret,
    /** OSS bucket */
    bucket: 'cdn-static-resources',
    /** OSS上传文件域名 */
    ossUrl: 'https://cdn-static-resources.oss-cn-hangzhou.aliyuncs.com',
    /** CDN访问域名(oss使用域名绑定之后变成CND) */
    cdnUrl: 'http://cdn.static.msvc.top',
    /** app静态资源上传路径 */
    appPath: 'dgiot_amis',
    /** 版本号 */
    appVersion: "v" + dayjs_1["default"]().format('YYYY-MM-DD-HH-mm-ss')
};
exports.aliOssConf = aliOssConf;
var cdnPublicPath = enableCDN ? aliOssConf.cdnUrl + "/" + aliOssConf.appPath + "/" + aliOssConf.appVersion + "/" : undefined;
exports.cdnPublicPath = cdnPublicPath;
