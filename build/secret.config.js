"use strict";
exports.__esModule = true;
exports.ossSecretConfig = void 0;
var _a = process.env, OSS_KEY = _a.OSS_KEY, OSS_SECRET = _a.OSS_SECRET;
/**
 * OSS 访问密钥
 */
var ossSecretConfig = {
    accessKeyId: OSS_KEY !== null && OSS_KEY !== void 0 ? OSS_KEY : '',
    accessKeySecret: OSS_SECRET !== null && OSS_SECRET !== void 0 ? OSS_SECRET : ''
};
exports.ossSecretConfig = ossSecretConfig;
