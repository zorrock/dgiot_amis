/** 用户权限 */
interface UserPermission {
  /** 权限列表 */
  readonly permissions: string[];
  /** 角色列表 */
  readonly roles: string[];
  /** 是否拥有指定权限 */
  hasPermissions: (...permissions: string[]) => boolean;
  /** 是否拥有指定角色 */
  hasRoles: (...roles: string[]) => boolean;
}

/** 路径变量 */
type PathVariable = { [path: string]: string | number | boolean };
/** url querystring 部分 */
type QueryString = { [param: string]: string };
/** 路由权限配置 */
type RouterAuthorityConfig = string | string[] | ((userPermissionInfo: UserPermission) => boolean);
/** 路由状态 */
type RouterState = { [name: string]: any };

/** Router对应的Location信息 */
interface RouterLocation {
  /** url的path部分 */
  pathname: string;
  /** url的querystring部分(以"?"前缀开始) */
  search: string;
  /** url的hash部分(#号后面部分) */
  hash: string;
  /** url的querystring解析结果(一个对象) */
  query: { [name: string]: any };
  /** router.push 传入的 state */
  state?: { [name: string]: any };
}

/** 路由配置 */
interface RouterConfig {
  /** 路由路径(支持path-to-regexp) */
  path: string;
  /** 路由路径中有变量时，配置的路径变量对象 */
  pathVariable?: PathVariable;
  /** 设置路由路径的queryString部分 */
  querystring?: QueryString;
  /** 表示是否严格匹配，即location是否和path完全一致 */
  exact?: boolean;
  /** 页面路径(根路径为“/src/pages”) */
  pagePath?: string;
  /** 重定向到其它路由或url(支持http(s)://路径) */
  redirect?: string;
  /** 路由图标 */
  icon?: string;
  /** 路由名称 */
  name: string;
  /** Html页面Title(不配置就默认取“name”) */
  pageTitle?: string;
  /** 默认展开子路由 */
  defaultOpen?: boolean;
  /** 面包屑文本(不配置就默认取“name”) */
  breadcrumbName?: string;
  /** 是否隐藏面包屑导航 */
  hideBreadcrumb?: boolean;
  /** 路由分组名称(配置才会分组，不配置就不分组) */
  groupName?: string;
  /** 隐藏当前路由和子路由 */
  hideMenu?: boolean;
  /** 隐藏子路由 */
  hideChildrenMenu?: boolean;
  /** 路由状态 */
  state?: RouterState;
  /** 路由权限控制(权限字符串或自定义函数) */
  authority?: RouterAuthorityConfig;
  /** 子路由配置 */
  routes?: RouterConfig[];
  // /** 扩展属性 */
  // [property: string]: any;
}

/** 运行时路由 */
interface RuntimeRouter extends RouterConfig {
  /** 路由 路径中有变量时，配置的路径变量对象 */
  pathVariable: PathVariable;
  /** 设置路由路径的queryString部分 */
  querystring: QueryString;
  /** 表示是否严格匹配，即location是否和path完全一致 */
  exact: boolean;
  /** Html页面Title(不配置就默认取“name”) */
  pageTitle: string;
  /** 面包屑文本(不配置就默认取“name”) */
  breadcrumbName: string;
  /** 是否隐藏面包屑导航 */
  hideBreadcrumb: boolean;
  /** 隐藏当前路由和子路由 */
  hideMenu: boolean;
  /** 隐藏子路由 */
  hideChildrenMenu: boolean;
  /** 路由状态 */
  state: RouterState;
  /** 子路由配置 */
  routes?: RuntimeRouter[];
  // /** 扩展属性 */
  // [property: string]: any;
}

/** 运行时菜单项 */
interface RuntimeMenuItem {
  /** 路由配置 */
  runtimeRouter: RuntimeRouter;
  /** 当前菜单唯一Key */
  menuKey: string;
  /** 当前菜单的所有上级菜单的Key数组 */
  parentKeys: string[];
  /** 子菜单项 */
  children: RuntimeMenuItem[];
  /** 根据配置规则，当前菜单是否隐藏 */
  isHide: boolean;
  // /** 扩展属性 */
  // [property: string]: any;
}

// /** 多页签项(多页签项) */
// interface MultiTabItem {
//   /** 路由菜单项 */
//   menuItem: RuntimeMenuItem;
//   /** 路由页签项唯一Key */
//   multiTabKey: string;
//   /** 当前url路径 */
//   currentPath: string;
//   /** 当前页面location状态 */
//   location: RouterLocation;
//   /** 是否是首页 */
//   isHomePage: boolean;
//   /** 当前页签是否是选中状态 */
//   active: boolean;
//   /** 最后一次活动时间(时间戳) */
//   lastActiveTime: number;
//   /** 是否显示关闭按钮 */
//   showClose: boolean;
// }

/** 全局Layout菜单数据 */
interface LayoutMenuData {
  /** 根菜单 */
  rootMenu: RuntimeMenuItem;
  /** 根菜单(过滤隐藏的菜单) */
  showRootMenu?: RuntimeMenuItem;
  /**
   * 拍平的菜单数据
   * <pre>
   *   Map<RuntimeMenuItem.routerConfig.path, RuntimeMenuItem>
   * </pre>
   */
  flattenMenuMap: Map<String, RuntimeMenuItem>;
  /**
   * 提供外部用户使用
   * <pre>
   *   { path: MenuDataItem }
   * </pre>
   */
  flattenMenu: { [path: string]: RuntimeMenuItem };
  /** 当前访问Url地址 */
  currentPath: string;
  /** 当前访问页面对应的菜单 */
  currentMenu?: RuntimeMenuItem;
  /** 当前访问页面对应的显示菜单(显示逻辑对应关系) */
  showCurrentMenu?: RuntimeMenuItem;
}

/** 路由菜单设置 */
interface RouterMenuSettings {
  // /** 是否启用多语言 */
  // enableLocale?: boolean;
  /** 默认展开子菜单 */
  defaultOpen?: boolean;
}

/** 全局Layout配置 */
interface LayoutSettings {
  /** 菜单配置 */
  menu: RouterMenuSettings;
  /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  iconScriptUrl: string;
  /** html页面title后缀 */
  htmlTitleSuffix: string;
}

// ----------------------------------------------------------------------------------- 页面布局配置

/** 页面布局配置基础属性 */
interface BaseLayoutConfig {
  /** 匹配路径(支持path-to-regexp) */
  path: string;
  /** 当前布局下的路由配置 */
  routes: RouterConfig[];
  /** 401未登录页面 */
  401?: string,
  /** 403无权访问页面 */
  403?: string,
  /** 404页面不存在 */
  404?: string,
}

/** 通用页面布局配置 */
interface GenericLayoutConfig extends BaseLayoutConfig {
  /** 页面布局类型 */
  layout: string;
  /** 页面布局配置 */
  layoutProps: object;
}

/** 页面布局配置基础属性 */
interface RuntimeBaseLayoutConfig extends BaseLayoutConfig {
  /** 当前布局下的路由 */
  routes: RuntimeRouter[];
}

/** 通用页面布局配置 */
interface RuntimeGenericLayoutConfig extends RuntimeBaseLayoutConfig {
  /** 页面布局类型 */
  layout: string;
  /** 页面布局配置 */
  layoutProps: object;
}
