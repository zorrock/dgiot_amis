import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { $rootMounted, initAppPage } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';
import { logger } from '@/utils/logger';
import { layoutToRuntime, LayoutType, locationHashMatch, RuntimeLayoutConfig } from "@/utils/router";
import { NestSideMenuLayout } from '@/layouts/NestSideMenuLayout';
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
    const matched = locationHashMatch(initLocationHash, props.runtimeLayouts);
    const currentLayout = matched?.currentLayout;
    const currentRouter = matched?.currentRouter;
    const currentMenu = matched?.currentMenu;
    const rootMenus = matched?.rootMenus;
    log.info("initLocationHash ->", initLocationHash);
    log.info("currentLayout ->", currentLayout);
    log.info("currentRouter ->", currentRouter);
    log.info("currentMenu ->", currentMenu);
    log.info("rootMenus ->", rootMenus);
    this.state = {locationHash: initLocationHash, currentLayout, currentRouter, currentMenu, rootMenus};
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
    const {runtimeLayouts} = this.props;
    const locationHash = getLocationHash();
    const matched = locationHashMatch(locationHash, runtimeLayouts);
    const currentLayout = matched?.currentLayout;
    const currentRouter = matched?.currentRouter;
    const currentMenu = matched?.currentMenu;
    const rootMenus = matched?.rootMenus;
    log.info("event ->", event.newURL);
    log.info("locationHash ->", locationHash);
    log.info("currentLayout ->", currentLayout);
    log.info("currentRouter ->", currentRouter);
    log.info("currentMenu ->", currentMenu);
    log.info("rootMenus ->", rootMenus);
    this.setState({locationHash, currentLayout, currentRouter, currentMenu, rootMenus})
  }

  protected getNestSideLayout() {
    const {currentLayout, currentRouter, currentMenu, rootMenus, location, match} = this.state;
    return (
      <NestSideMenuLayout
        route={currentRouter}
        location={location}
        match={match}
        rootRoutes={currentLayout?.routes}

      />
    );
  }

  render() {
    const {currentLayout} = this.state;
    if (!currentLayout) return "404";
    if (currentLayout.layout === LayoutType.Blank) {
      return "空白页 LayoutType.Blank";
    }
    if (currentLayout.layout === LayoutType.NestSide) {
      return this.getNestSideLayout();
    }
    return "不支持的Layout";
  }
}

// ----------------------------------------------------------------------------------- 开始初始化应用
initAppPage();
const runtimeLayouts = layoutToRuntime(routerConfigs);
log.info("layoutSettings ->", layoutSettings);
log.info("runtimeLayouts ->", runtimeLayouts);
ReactDOM.render(<ReactAppPage layoutSettings={layoutSettings} runtimeLayouts={runtimeLayouts}/>, $rootMounted)
