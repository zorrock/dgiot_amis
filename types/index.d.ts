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

/** 是否是生产环境 */
declare const isProdEnv: boolean;

interface AmisPage {
  /** amis schema 对象 */
  schema: any;
}

interface ReactPage {
  /** React组件 */
  default: any;
}

/** Amis应用 */
interface AmisApp {
  /**
   * 根据组件名称获取组件
   * @param name 组件名称
   */
  getComponentByName<C = any>(name: string): C;

  /** 获取所有组件 */
  getComponents<C = any>(): C[];

  [property: any]: any;
}

interface UserInfo {
  /** 用户ID */
  readonly uid: string,
  /** 登录名 */
  readonly loginName: string,
  /** 昵称 */
  readonly nickname: string,
  /** 头像 */
  readonly avatar?: null,
  /** 手机号 */
  readonly telephone?: string,
  /**  */
  readonly email?: string,
  /** 过期时间 */
  readonly expiredTime?: string,
  /** 启用状态 */
  readonly enabled?: string,
  /** 备注 */
  readonly description?: string,
}

interface SecurityContext extends UserPermission {
  /** 用户信息 */
  readonly userInfo: UserInfo;
}

interface AppComponent {
  /**
   * 刷新菜单
   * @param callback
   */
  refreshMenu(callback?: () => void): Promise<void>;
}

interface Window {
  // g_app: {
  //   _store: any;
  //   [propName: string]: any;
  // };

  /** 当前登录用户信息 */
  currentUser?: UserInfo;
  /** 应用安全上下文 */
  securityContext?: SecurityContext;
  /** 当前显示的amis页面div容器mounted dom id */
  currentAmisId: string;
  /** 当前应用组件(React组件) */
  appComponent: AppComponent;
  /** 当前所有的Amis页面 */
  amisPages: {
    [name: string]: AmisApp;
  }
}
