import React, { Component } from 'react';
import ReactDOM from "react-dom";
import lodash from "lodash";
import { Button, Result } from "antd";
import { getLayoutMenuData } from "@/components/Layout/utils/menu-data";
import { BlankLayout } from "@/layouts/BlankLayout";
import { NestSideMenuLayout } from '@/layouts/NestSideMenuLayout';
import { $rootMounted, initRootDiv } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';
import { logger } from '@/utils/logger';
import { request } from '@/utils/request';
import { serverHost } from '@/server-api';
import { layoutToRuntime, LayoutType, locationHashMatch, routerHistory, RuntimeLayoutConfig } from "@/utils/router";
import { layoutSettings, routerConfigs } from './router-config';

const log = logger.getLogger("src/schema-app.tsx");

interface ReactAppPageProps {
  /** 布局全局设置 */
  layoutSettings: LayoutSettings;
  /** 运行时路由 */
  runtimeLayouts: RuntimeLayoutConfig[];
}

interface ReactAppPageState {
  /** 页面路径 */
  locationHash: string;
  /** 当前Layout */
  currentLayout?: RuntimeLayoutConfig;
  /** 当前Router */
  currentRouter?: RuntimeRouter;
  /** 当前Menu */
  currentMenu?: RuntimeMenuItem;
  /** 当前根菜单(一级菜单) */
  rootMenus?: RuntimeMenuItem[];
  /** location */
  location?: RouterLocation;
  /** 路由匹配参数 */
  match?: RouteMatchParams;
}

class ReactAppPage extends Component<ReactAppPageProps, ReactAppPageState> {

  constructor(props: ReactAppPageProps) {
    super(props);
    const initLocationHash = getLocationHash();
    const matched = locationHashMatch(props.layoutSettings, initLocationHash, props.runtimeLayouts);
    const currentLayout = matched?.currentLayout;
    const currentRouter = matched?.currentRouter;
    const currentMenu = matched?.currentMenu;
    const rootMenus = matched?.rootMenus;
    const location = matched?.location;
    const match = matched?.match;
    this.state = { locationHash: initLocationHash, currentLayout, currentRouter, currentMenu, rootMenus, location, match };
    log.info("initState ->", this.state);
  }

  /** APP挂载之后的操作 */
  componentDidMount() {
    window.addEventListener("hashchange", this.onLocationHashChange);
  }

  /** APP卸载之前到的操作 */
  componentWillUnmount() {
    window.removeEventListener("hashchange", this.onLocationHashChange);
  }

  /** Location Hash更新事件 */
  onLocationHashChange = (event: HashChangeEvent) => {
    const { runtimeLayouts, layoutSettings } = this.props;
    const locationHash = getLocationHash();
    // 跳转到默认地址或登录地址 - 全局跳转
    const { loginPath, defaultPath } = layoutSettings;
    if (loginPath && !window.currentUser && locationHash !== loginPath) {
      routerHistory.push({ hash: loginPath });
      return;
    }
    if (lodash.trim(locationHash).length <= 0 && defaultPath && locationHash !== defaultPath) {
      routerHistory.push({ hash: defaultPath });
      return;
    }
    // 路由菜单匹配
    const matched = locationHashMatch(layoutSettings, locationHash, runtimeLayouts);
    const currentLayout = matched?.currentLayout;
    const currentRouter = matched?.currentRouter;
    const currentMenu = matched?.currentMenu;
    const rootMenus = matched?.rootMenus;
    const location = matched?.location;
    const match = matched?.match;
    log.info("event ->", event.newURL);
    log.info("locationHash ->", locationHash);
    // 跳转到登录地址 - 路由跳转
    if (currentLayout && currentLayout["401"] && !window.currentUser && locationHash !== currentLayout["401"]) {
      routerHistory.push({ hash: currentLayout["401"] });
      return;
    }
    this.setState({ locationHash, currentLayout, currentRouter, currentMenu, rootMenus, location, match })
    log.info("newState ->", this.state);
  }

  protected getNestSideLayout(layoutMenuData: LayoutMenuData) {
    const { layoutSettings: { menu, iconScriptUrl, htmlTitleSuffix } } = this.props;
    const { currentLayout, currentRouter, location, match } = this.state;
    return (
      <NestSideMenuLayout
        defaultOpen={menu.defaultOpen}
        menuIconScriptUrl={iconScriptUrl}
        htmlTitleSuffix={htmlTitleSuffix}
        route={currentRouter!}
        location={location!}
        match={match!}
        rootRoutes={currentLayout?.routes!}
        layoutMenuData={layoutMenuData}
        currentLayout={currentLayout}
        {...currentLayout?.layoutProps}
      />
    );
  }

  protected getBlankLayout(layoutMenuData: LayoutMenuData) {
    const { layoutSettings: { htmlTitleSuffix } } = this.props;
    const { currentLayout, currentRouter, location, match } = this.state;
    return (
      <BlankLayout
        htmlTitleSuffix={htmlTitleSuffix}
        route={currentRouter!}
        location={location!}
        match={match!}
        rootRoutes={currentLayout?.routes!}
        layoutMenuData={layoutMenuData}
        {...currentLayout?.layoutProps}
      />
    );
  }

  protected getNoFoundPage() {
    return (
      <Result
        status={"404"}
        title="404"
        subTitle={<div style={{ fontSize: 14, fontWeight: "bold" }}>抱歉，您访问的页面不存在。</div>}
        extra={<Button type="primary" onClick={() => history.back()}>返回上一页</Button>}
      />
    );
  }

  render() {
    const { currentLayout, currentMenu, rootMenus, location } = this.state;
    if (!currentLayout) {
      return this.getNoFoundPage();
    }
    // 跳转到登录地址 - 路由跳转
    if (currentLayout && currentLayout["401"] && !window.currentUser && location?.hash !== currentLayout["401"]) {
      routerHistory.push({ hash: currentLayout["401"] });
      return <div/>;
    }
    const layoutMenuData = getLayoutMenuData({ location: location!, rootMenus: rootMenus!, currentMenu: currentMenu! });
    log.info("layoutMenuData ->", layoutMenuData);
    if (currentLayout.layout === LayoutType.Blank) {
      return this.getBlankLayout(layoutMenuData);
    }
    if (currentLayout.layout === LayoutType.NestSide) {
      return this.getNestSideLayout(layoutMenuData);
    }
    return "不支持的Layout";
  }

  // /**
  //  * 刷新菜单
  //  */
  // public async refreshMenu(callback?: () => void) {
  //   const menus = await request.get(apiPath.LoginController.managerMenus);
  //   const newRouterConfigs = lodash.cloneDeep(routerConfigs);
  //   newRouterConfigs[1].routes = menus.map((menu: any) => menuToRoute(menu));
  //   const runtimeLayouts = layoutToRuntime(newRouterConfigs);
  //   this.setState({ runtimeLayouts }, callback);
  // }
}

// ----------------------------------------------------------------------------------- 开始初始化应用
// 初始化root div容器
initRootDiv();

const initApp = () => {
  // 跳转到默认地址或登录地址
  const locationHash = getLocationHash();
  const { loginPath, defaultPath } = layoutSettings;
  if (loginPath && !window.currentUser) {
    routerHistory.push({ hash: loginPath });
  }
  if (lodash.trim(locationHash).length <= 0 && defaultPath) {
    routerHistory.push({ hash: defaultPath });
  }

  const runtimeLayouts = layoutToRuntime(routerConfigs);
  log.info("layoutSettings ->", layoutSettings);
  log.info("runtimeLayouts ->", runtimeLayouts);
  window.appComponent = ReactDOM.render(<ReactAppPage layoutSettings={layoutSettings} runtimeLayouts={runtimeLayouts}/>, $rootMounted) as any;
  log.info("ReactDOM.render完成!");
};
if (isProdEnv) {
  // 获取服务端菜单
  request.get(`${serverHost}/!/amis-api/curd-page@menu`)
    .then(data => {
      routerConfigs[1].routes = data;
      initApp();
    });
} else {
  // 使用配置的菜单
  initApp();
}
