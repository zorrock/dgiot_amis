import lodash from 'lodash';
import { pathToRegexp } from 'path-to-regexp';
import stableStringify from "fast-json-stable-stringify";
import { NestSideMenuLayoutProps } from "@/layouts/NestSideMenuLayout";
import { noValue } from "@/utils/utils";

/** 布局类型 */
enum LayoutType {
  /** 侧边栏二级路由布局(内嵌的侧边栏 - NestSideLayout) */
  NestSide = "NestSide",
  /** 顶部和侧边栏二级路由布局(顶部和侧边栏) */
  TopSide = "TopSide",
  /** 空布局，使用amis-schema开发页面 */
  AmisBlank = "AmisBlank",
  /** 空布局，不支持amis-schema开发页面 */
  Blank = "HtmlBlank",
}

interface NestSideLayoutConfig extends BaseLayoutConfig {
  /** 页面布局类型 */
  layout: LayoutType.NestSide;
  /** 页面布局配置 */
  layoutProps: Partial<NestSideMenuLayoutProps>;
}

interface RuntimeNestSideLayoutConfig extends RuntimeBaseLayoutConfig {
  /** 页面布局类型 */
  layout: LayoutType.NestSide;
  /** 页面布局配置 */
  layoutProps: Partial<NestSideMenuLayoutProps>;
}

// interface TopSideLayoutConfig extends BaseLayoutConfig {
//   /** 页面布局类型 */
//   layout: LayoutType.TopSide;
//   /** TODO 页面布局配置 */
//   layoutProps: object;
// }

// interface AmisBlankLayoutConfig extends BaseLayoutConfig {
//   /** 页面布局类型 */
//   layout: LayoutType.AmisBlank;
//   /** TODO 页面布局配置 */
//   layoutProps: object;
// }

interface BlankLayoutConfig extends BaseLayoutConfig {
  /** 页面布局类型 */
  layout: LayoutType.Blank;
  /** TODO 页面布局配置 */
  layoutProps: object;
}

interface RuntimeBlankLayoutConfig extends RuntimeBaseLayoutConfig {
  /** 页面布局类型 */
  layout: LayoutType.Blank;
  /** TODO 页面布局配置 */
  layoutProps: object;
}

/** 布局配置 */
type LayoutConfig = NestSideLayoutConfig | BlankLayoutConfig; // | TopSideLayoutConfig | AmisBlankLayoutConfig

/** 布局配置 */
type RuntimeLayoutConfig = RuntimeNestSideLayoutConfig | RuntimeBlankLayoutConfig;

// -----------------------------------------------------------------------------------

// Location状态数据
type LocationState = RouterLocation['state'];

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
  private routerLocationStateMap = new Map<string, LocationState>();

  constructor() {
  }

  /**
   * 页面跳转
   * @param hash  页面路径
   * @param state 页面的状态值
   */
  public push(hash: string, state: LocationState = {}): void {
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
  public replace(hash: string, state: LocationState = {}): void {
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
  public getLocationState(hash: string): LocationState {
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
  if (childPath.startsWith("/")) childPath = childPath.substring(1);
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

// 递归转换 RouterConfig -> RuntimeRouter
const routerToRuntime = (rootPath: string, current: RouterConfig, parent?: RuntimeRouter): RuntimeRouter => {
  const {
    path, pathVariable, querystring, exact, pagePath, redirect, icon, name, pageTitle, defaultOpen, breadcrumbName,
    hideBreadcrumb, groupName, hideMenu, hideChildrenMenu, state, authority, routes: childRoutes, ...props
  } = current;
  // 默认值处理
  current.path = parent ? joinPath(parent.path, path) : joinPath(rootPath, path);
  current.pathVariable = pathVariable ?? {};
  current.querystring = querystring ?? {};
  current.exact = exact ?? false;
  current.name = name ?? "新页面";
  current.pageTitle = pageTitle ?? current.name;
  current.breadcrumbName = breadcrumbName ?? current.name;
  current.hideBreadcrumb = hideBreadcrumb ?? false;
  current.hideMenu = hideMenu ?? false;
  current.hideChildrenMenu = hideChildrenMenu ?? false;
  current.state = state ?? {};
  // 创建运行时对象
  const runtimeRouter: RuntimeRouter = {
    path: current.path,
    pathVariable: current.pathVariable,
    querystring: current.querystring,
    exact: current.exact,
    pagePath,
    redirect,
    icon,
    name,
    pageTitle: current.pageTitle,
    defaultOpen,
    breadcrumbName: current.breadcrumbName,
    hideBreadcrumb: current.hideBreadcrumb,
    groupName,
    hideMenu: current.hideMenu,
    hideChildrenMenu: current.hideChildrenMenu,
    state: current.state,
    authority,
    routes: [],
    ...props,
  };
  // 递归调用
  if (childRoutes && childRoutes.length > 0) {
    childRoutes.forEach(childRoute => {
      runtimeRouter.routes?.push(routerToRuntime(rootPath, childRoute, runtimeRouter));
    });
  }
  return runtimeRouter;
}

/** 把Layout配置转换成运行时Layout */
const layoutToRuntime = (routerConfigs: LayoutConfig[]): RuntimeLayoutConfig[] => {
  if (!routerConfigs || routerConfigs.length <= 0) return routerConfigs as RuntimeLayoutConfig[];
  routerConfigs.forEach(routerConfig => {
    const {path: rootPath, routes} = routerConfig;
    if (!routes || routes.length <= 0) return;
    const runtimeRouters: RuntimeRouter[] = [];
    routes.forEach(currentRoute => runtimeRouters.push(routerToRuntime(rootPath, currentRoute)));
    routerConfig.routes = runtimeRouters;
  });
  return routerConfigs as RuntimeLayoutConfig[];
}

// 获取菜单key(唯一不重复)
const getMenuKey = (runtimeRouter: RuntimeRouter): string => {
  const {path, exact, redirect, pathVariable, querystring, name} = runtimeRouter;
  return `${path}|${exact}|${stableStringify(pathVariable ?? {})}|${stableStringify(querystring ?? {})}|${name}|${redirect}`;
}

/** 把Router转换成Menu(递归) */
const routerToMenu = (runtimeRouter: RuntimeRouter, parent?: RuntimeMenuItem): RuntimeMenuItem => {
  const runtimeMenuItem: RuntimeMenuItem = {runtimeRouter, menuKey: getMenuKey(runtimeRouter), parentKeys: [], children: [], isHide: false};
  if (parent) {
    runtimeMenuItem.parentKeys = [...parent.parentKeys, parent.menuKey];
    parent.children.push(runtimeMenuItem);
  }
  // 递归调用
  if (runtimeRouter.routes && runtimeRouter.routes.length > 0) {
    runtimeRouter.routes.forEach(child => routerToMenu(child, runtimeMenuItem));
  }
  return runtimeMenuItem;
}

// 路由匹配
const routerMatch = (locationHash: string, runtimeRouter: RuntimeRouter): RuntimeRouter | undefined => {
  if (noValue(locationHash) || noValue(runtimeRouter)) return;
  // 存在子路由 - 递归匹配
  if (runtimeRouter.routes && runtimeRouter.routes.length > 0) {
    let matchRuntimeRouter: RuntimeRouter | undefined = undefined;
    runtimeRouter.routes.forEach(route => {
      if (matchRuntimeRouter) return;
      // 递归匹配
      matchRuntimeRouter = routerMatch(locationHash, route);
    });
    if (matchRuntimeRouter) return matchRuntimeRouter;
  }
  // 路径匹配
  if (pathToRegexp(runtimeRouter.path).test(locationHash)) {
    return runtimeRouter;
  }
  return;
}

interface LayoutMatchResult {
  matchedLayout: RuntimeLayoutConfig;
  matchedRouter: RuntimeRouter;
}

/** Layout匹配(递归) */
const layoutMatch = (locationHash: string, runtimeLayouts: RuntimeLayoutConfig[]): LayoutMatchResult | undefined => {
  if (!runtimeLayouts || noValue(locationHash) || runtimeLayouts.length <= 0) return;
  let matchedLayout: RuntimeLayoutConfig | undefined = undefined;
  let matchedRouter: RuntimeRouter | undefined = undefined;
  runtimeLayouts.forEach(runtimeLayout => {
    if (matchedLayout) return;
    const {path, routes} = runtimeLayout;
    if (!pathToRegexp(path, undefined, {end: false}).test(locationHash)) {
      return;
    }
    if (!routes || routes.length <= 0) {
      return;
    }
    routes.forEach(route => {
      if (matchedRouter) return;
      matchedRouter = routerMatch(locationHash, route);
    });
    if (matchedRouter) {
      matchedLayout = runtimeLayout;
    }
  });
  if (matchedLayout && matchedRouter) {
    return {matchedLayout, matchedRouter}
  }
  return;
}

interface LocationHashMatchResult {
  /** 当前Layout */
  currentLayout?: RuntimeLayoutConfig;
  /** 当前Router */
  currentRouter?: RuntimeRouter;
  /** 当前Menu */
  currentMenu?: RuntimeMenuItem;
  /** 当前根菜单(一级菜单) */
  rootMenus?: RuntimeMenuItem[];
}

/** 页面路径匹配路由菜单等信息 */
const locationHashMatch = (locationHash: string, runtimeLayouts: RuntimeLayoutConfig[]): LocationHashMatchResult | undefined => {
  const matched = layoutMatch(locationHash, runtimeLayouts);
  if (!matched) return;
  const currentMenu = routerToMenu(matched.matchedRouter);
  const rootMenus: RuntimeMenuItem[] = [];
  matched.matchedLayout.routes.forEach(route => rootMenus.push(routerToMenu(route)));
  return {currentLayout: matched.matchedLayout, currentRouter: matched.matchedRouter, currentMenu, rootMenus};
}

export { LayoutType, LayoutConfig, RuntimeLayoutConfig, routerHistory, layoutToRuntime, routerToMenu, layoutMatch, locationHashMatch };
