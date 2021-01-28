import lodash from 'lodash';
import { parse } from 'qs'

/**
 * 检查 name 是否是 o 对象的直接或继承属性。
 * @param o     对象
 * @param name  属性名
 */
const hasPropertyIn = (o: object, name: string): boolean => lodash.hasIn(o, name);

/**
 * 获取 prop 或者 state 值(prop优先)
 * @param propName  prop属性名
 * @param props     prop对象
 * @param state     state对象
 * @param stateName state属性名
 */
const getPropOrStateValue = <T>(propName: string, props: object, state: object, stateName?: string): T => {
  if (lodash.hasIn(props, propName)) {
    return props[propName] as T;
  }
  return state[stateName ?? propName] as T;
};

/**
 * 判断变量是否有值 value !== null && value !== undefined
 * @param value 目标变量
 */
const hasValue = (value: any): boolean => {
  return value !== null && value !== undefined;
};

/**
 * 判断变量是否有值 value === null || value === undefined
 * @param value 目标变量
 */
const noValue = (value: any): boolean => {
  return value === null || value === undefined;
};

/**
 * 获取字符串值
 * @param value 变量值
 * @param force undefined、null 强制转换成空字符串
 */
const getStrValue = (value: any, force?: boolean): string | undefined | null => {
  if (!force && (value === undefined || value === null)) {
    return value;
  }
  return hasValue(value) ? `${value}` : '';
};

/**
 * 获取url querystring部分参数值
 * @param paramName 参数名称,不传则返回所有querystring参数
 * @param url       待解析的url,默认为location.href
 */
const getUrlParam = (paramName?: string, url?: string): any => {
  const str = url || window.location.href;
  const idx = str.indexOf('?');
  const hashIdx = str.indexOf('#');
  if (idx === -1) return undefined;
  const urlParams = parse(str.substring(idx + 1, hashIdx !== -1 ? hashIdx : undefined)) || {};
  if (paramName) return urlParams[paramName];
  return urlParams
}

/**
 * 获取Location的Hash值
 */
const getLocationHash = (): string => {
  const hash = lodash.trim(document.location.hash);
  return hash.startsWith("#") ? hash.substr(1, hash.length) : "";
}

/**
 * 菜单数据转换成路由配置
 */
const menuToRoute = (menu: MenuInfo): RouterConfig => {
  const { name, icon, path, pagePath, hideMenu, hideChildrenMenu, extConfig, children } = menu;
  let ext = {};
  if (extConfig) {
    try {
      ext = JSON.parse(extConfig);
    } catch (err) {
      console.error("菜单扩展配置解析失败 -> ", menu);
      ext = {};
    }
  }
  const route: RouterConfig = { name, icon, path, pagePath, hideMenu: hideMenu !== 1, hideChildrenMenu: hideChildrenMenu !== 1, ...ext };
  if (children) {
    route.routes = [];
    children.forEach(child => route.routes?.push(menuToRoute(child)));
  }
  return route;
}

class UserSecurityContext implements SecurityContext {
  readonly permissions: string[];
  readonly roles: string[];
  readonly userInfo: UserInfo;

  constructor(permissions: string[], roles: string[], userInfo: UserInfo) {
    this.permissions = permissions;
    this.roles = roles;
    this.userInfo = userInfo;
  }

  hasPermissions(...permissions: string[]): boolean {
    return UserSecurityContext.hasAll(this.permissions, ...permissions);
  }

  hasRoles(...roles: string[]): boolean {
    return UserSecurityContext.hasAll(this.roles, ...roles);
  }

  hasAnyPermissions(...permissions: string[]): boolean {
    return UserSecurityContext.hasAny(this.permissions, ...permissions);
  }

  hasAnyRoles(...roles: string[]): boolean {
    return UserSecurityContext.hasAny(this.roles, ...roles);
  }

  public static hasAll(source: string[], ...target: string[]): boolean {
    if (!target || target.length <= 0) return true;
    if (!source || source.length <= 0) return false;
    let flag = true;
    target.forEach(item => {
      if (!flag) return;
      if (source.indexOf(item) < 0) {
        flag = false;
      }
    });
    return flag;
  }

  public static hasAny(source: string[], ...target: string[]) {
    if (!target || target.length <= 0) return true;
    if (!source || source.length <= 0) return false;
    let flag = false;
    target.forEach(item => {
      if (flag) return;
      if (source.indexOf(item) >= 0) {
        flag = true;
      }
    });
    return flag;
  }
}

export { hasPropertyIn, getPropOrStateValue, noValue, hasValue, getStrValue, getUrlParam, getLocationHash, menuToRoute, UserSecurityContext };
