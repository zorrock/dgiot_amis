import { message } from "antd";
import { request } from "@/utils/request";
import { logger } from "@/utils/logger";
import { LayoutConfig, LayoutType } from "@/utils/router";

const log = logger.getLogger("src/utils/login-service.ts");

/**
 * 用户权限信息
 */
class UserSecurityContext implements SecurityContext {
  readonly userInfo: UserInfo;
  readonly roles: string[];
  readonly permissions: string[];

  constructor(permissions: string[], roles: string[], userInfo: UserInfo) {
    this.permissions = permissions;
    this.roles = roles;
    this.userInfo = userInfo;
  }

  hasRoles(...roles: string[]): boolean {
    return UserSecurityContext.hasAll(this.roles, ...roles);
  }

  hasPermissions(...permissions: string[]): boolean {
    return UserSecurityContext.hasAll(this.permissions, ...permissions);
  }

  hasAnyRoles(...roles: string[]): boolean {
    return UserSecurityContext.hasAny(this.roles, ...roles);
  }

  hasAnyPermissions(...permissions: string[]): boolean {
    return UserSecurityContext.hasAny(this.permissions, ...permissions);
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

/**
 * 获取当前登录用户信息
 */
const getCurrentUser = async (currentUserApi: string): Promise<void> => {
  if (!currentUserApi) return;
  const securityContext = await request.get(currentUserApi);
  log.info("getCurrentUser -> ", securityContext);
  const { userInfo, roles = [], permissions = [] } = securityContext;
  const { extInfo = {}, ...restProps } = userInfo;
  window.currentUser = { ...restProps, ...extInfo };
  window.securityContext = new UserSecurityContext(userInfo, roles, permissions);
};

/**
 * 加载服务端菜单数据
 */
const getMenus = async (routerConfigs: LayoutConfig[], menuApi: string): Promise<LayoutConfig[] | undefined> => {
  if (!menuApi) return;
  const menus = await request.get(menuApi);
  const newRoutes = menus.map((menu: any) => menuToRoute(menu));
  let updated: boolean = false;
  routerConfigs.forEach(layoutConfig => {
    if (updated || layoutConfig.layout === LayoutType.Blank) return;
    updated = true;
    layoutConfig.routes = newRoutes;
  });
  if (!updated) return;
  return routerConfigs;
}

/**
 * 用户登录
 */
const userLogin = (loginApi?: string) => {
  if (!loginApi) {
    message.warn("未配置layoutSettings.loginApi").then();
    return;
  }


};

export { UserSecurityContext, menuToRoute, getCurrentUser, getMenus, userLogin }
