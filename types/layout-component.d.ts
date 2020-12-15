/** 路由匹配参数 */
interface RouteMatchParams {
  /** 匹配参数 */
  params: { [param: string]: string };
  /** 是否是严格匹配 */
  isExact: boolean;
  /** URL path 字符串 */
  path: string;
  /** URL 字符串 */
  url: string;
}

/** 布局页面组件基础属性 */
interface LayoutPageComponentProps {
  /** 当前路由信息 */
  route: RuntimeRouter;
  /** 组件的RouterLocation信息 */
  location: RouterLocation;
  /** 路由匹配参数 */
  match: RouteMatchParams;
  /** 一级路由 */
  rootRoutes: RuntimeRouter[];
  // /** */
  // children: React.Component;
  // /** */
  // history: object;
  // /** */
  // staticContext?: object;
}
