import { ossSecretConfig } from './git-ignore.config';
import dayjs from 'dayjs';

const { ENABLE_CND } = process.env;
// 是否启用CDN
const enableCND = `${ENABLE_CND}` === 'true';

/**
 * 静态资源上次阿里OSS配置
 */
const aliOssConf = {
  /** OSS region */
  region: 'oss-cn-hangzhou',
  /** OSS access KeyId */
  accessKeyId: ossSecretConfig.accessKeyId,
  /** OSS access KeySecret */
  accessKeySecret: ossSecretConfig.accessKeySecret,
  /** OSS bucket */
  bucket: 'cdn-static-resources',
  /** OSS上传文件域名 */
  ossUrl: 'https://cdn-static-resources.oss-cn-hangzhou.aliyuncs.com',
  /** CDN访问域名(oss使用域名绑定之后变成CND) */
  cdnUrl: 'http://cdn.static.msvc.top',
  /** app静态资源上传路径 */
  appPath: 'amis-admin',
  /** 版本号 */
  appVersion: `v${dayjs().format('YYYY-MM-DD-HH-mm-ss')}`,
  // appVersion: 'v0.0.1',
};

export { enableCND, aliOssConf };
