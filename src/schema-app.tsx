import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { getLayoutMenuData } from "@/components/Layout/utils/menu-data";
import { $rootMounted, initAppPage } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';
import { logger } from '@/utils/logger';
import { layoutToRuntime, LayoutType, locationHashMatch, RuntimeLayoutConfig } from "@/utils/router";
import { BlankLayout } from "@/layouts/BlankLayout";
import { NestSideMenuLayout } from '@/layouts/NestSideMenuLayout';
import { layoutSettings, routerConfigs } from './router-config';
import { Button, Result } from "antd";

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
    const matched = locationHashMatch(props.layoutSettings.menu, initLocationHash, props.runtimeLayouts);
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
    const matched = locationHashMatch(layoutSettings.menu, locationHash, runtimeLayouts);
    const currentLayout = matched?.currentLayout;
    const currentRouter = matched?.currentRouter;
    const currentMenu = matched?.currentMenu;
    const rootMenus = matched?.rootMenus;
    const location = matched?.location;
    const match = matched?.match;
    log.info("event ->", event.newURL);
    log.info("locationHash ->", locationHash);
    this.setState({ locationHash, currentLayout, currentRouter, currentMenu, rootMenus, location, match })
    log.info("newState ->", this.state);
  }

  protected getNestSideLayout(layoutMenuData: LayoutMenuData) {
    const { currentLayout, currentRouter, location, match } = this.state;
    return (
      <NestSideMenuLayout
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
    const { currentLayout, currentRouter, location, match } = this.state;
    return (
      <BlankLayout
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
}

// ----------------------------------------------------------------------------------- 开始初始化应用
initAppPage();
const runtimeLayouts = layoutToRuntime(routerConfigs);
log.info("layoutSettings ->", layoutSettings);
log.info("runtimeLayouts ->", runtimeLayouts);
ReactDOM.render(<ReactAppPage layoutSettings={layoutSettings} runtimeLayouts={runtimeLayouts}/>, $rootMounted)
log.info("ReactDOM.render完成!");
