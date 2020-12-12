// declare module 'antd-dayjs-webpack-plugin';
// declare module 'webpack-aliyun-oss';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

interface Window {
  // g_app: {
  //   _store: any;
  //   [propName: string]: any;
  // };
}

/** 是否是生产环境 */
declare const isProdEnv: boolean;

interface AmisSchemaPageProp {
  /** amis schema 对象 */
  schema: any;
}
