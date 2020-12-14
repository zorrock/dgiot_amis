import lodash from 'lodash';
import { LayoutConfig } from "@/router-config";

type HistoryState = RouterLocation['state'];

/** 路由跳转工具类 */
class RouterHistory {
  private static getHash(hash: string): string | undefined {
    hash = lodash.trim(hash);
    if (!hash || hash.length <= 0) return;
    if (hash.startsWith("#")) hash = hash.substring(1);
    return hash;
  }

  /**
   * 全局路由的状态数据
   * <pre>
   *   Map<Location.hash, state>
   * </pre>
   */
  private routerLocationStateMap = new Map<string, HistoryState>();

  constructor() {
  }

  /**
   * 页面跳转
   * @param hash  页面路径
   * @param state 页面的状态值
   */
  public push(hash: string, state: HistoryState = {}): void {
    const path = RouterHistory.getHash(hash);
    if (!path) return;
    this.routerLocationStateMap.set(path, state);
    window.location.hash = `#${path}`;
  }

  /**
   * 替换页面状态值
   * @param hash  页面路径
   * @param state 页面的状态值
   */
  public replace(hash: string, state: HistoryState = {}): void {
    const path = RouterHistory.getHash(hash);
    if (!path) return;
    const oldState = this.routerLocationStateMap.get(path);
    if (!oldState) return;
    this.routerLocationStateMap.set(path, state);
  }

  /**
   * 获取页面状态
   * @param hash 页面路径
   */
  public getLocationState(hash: string): HistoryState {
    const path = RouterHistory.getHash(hash);
    if (!path) return;
    return this.routerLocationStateMap.get(path) ?? {};
  }
}

/** 路由跳转工具 */
const routerHistory = new RouterHistory();

// 连接url path
const joinPath = (path: string, childPath: string): string => {
  path = lodash.trim(path);
  childPath = lodash.trim(childPath);
  if (path.endsWith("/")) path = path.substring(0, path.length - 1);
  if (childPath.startsWith("/")) childPath = childPath.substring(0, path.length - 1);
  if (lodash.trim(path).length <= 0) {
    if (lodash.trim(childPath).length <= 0) {
      return "/";
    } else {
      return `/${childPath}`;
    }
  } else {
    if (lodash.trim(childPath).length <= 0) {
      return `/${path}`;
    } else {
      return `${path}/${childPath}`;
    }
  }
}

/**
 *
 * @param routerConfigs
 */
const routerToRuntime = (routerConfigs: LayoutConfig[]): LayoutConfig[] => {
  if (!routerConfigs || routerConfigs.length <= 0) return routerConfigs;
  routerConfigs.forEach(routerConfig => {
    const {path: rootPath, routes} = routerConfig;
    if (!routes || routes.length <= 0) return;

    const runtimeRouters: RuntimeRouter[] = [];
    routes.forEach(currentRoute => {
      const {
        path, pathVariable, querystring, exact, pagePath, redirect, icon, name, pageTitle, defaultOpen, breadcrumbName,
        hideBreadcrumb, groupName, hideMenu, hideChildrenMenu, state, authority, routes: childRoutes, ...props
      } = currentRoute;
      // 默认值处理
      currentRoute.path = joinPath(rootPath, path);
      currentRoute.pathVariable = pathVariable ?? {};
      currentRoute.querystring = querystring ?? {};
      currentRoute.exact = exact ?? false;
      currentRoute.name = name ?? "新页面";
      currentRoute.pageTitle = pageTitle ?? currentRoute.name;
      currentRoute.breadcrumbName = breadcrumbName ?? currentRoute.name;
      currentRoute.hideBreadcrumb = hideBreadcrumb ?? false;
      currentRoute.hideMenu = hideMenu ?? false;
      currentRoute.hideChildrenMenu = hideChildrenMenu ?? false;
      currentRoute.state = state ?? {};
      // 创建运行时对象
      const runtimeRouter: RuntimeRouter = {
        path: currentRoute.path,
        pathVariable: currentRoute.pathVariable,
        querystring: currentRoute.querystring,
        exact: currentRoute.exact,
        pagePath,
        redirect,
        icon,
        name,
        pageTitle: currentRoute.pageTitle,
        defaultOpen,
        breadcrumbName: currentRoute.breadcrumbName,
        hideBreadcrumb: currentRoute.hideBreadcrumb,
        groupName,
        hideMenu: currentRoute.hideMenu,
        hideChildrenMenu: currentRoute.hideChildrenMenu,
        state: currentRoute.state,
        authority,
        routes: [],
        ...props,
      };
      runtimeRouters.push(runtimeRouter);
      // 递归调用
      if (childRoutes && childRoutes.length > 0) {

      }
    });
    routerConfig.routes = runtimeRouters;
  });
  return routerConfigs;
}


function aa(routerConfigs: LayoutConfig[]): LayoutConfig {
  return routerConfigs[0];
}


export { routerHistory, routerToRuntime, aa };
