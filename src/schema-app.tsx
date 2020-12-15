import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { $rootMounted, initAppPage } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';
import { logger } from '@/utils/logger';
import { layoutToRuntime, RuntimeLayoutConfig } from "@/utils/router";
import { NestSideMenuLayout } from '@/layouts/NestSideMenuLayout';
import { layoutSettings, routerConfigs } from './router-config';

const log = logger.getLogger("src/schema-app.tsx");

interface ReactAppPageProps {
  /** 初始化的Location Hash值 */
  initLocationHash?: string;
  /** 布局全局设置 */
  layoutSettings: LayoutSettings;
  /** 运行时路由 */
  runtimeLayouts: RuntimeLayoutConfig[];
}

interface ReactAppPageState {
  // RouterLocation
}

class ReactAppPage extends Component<ReactAppPageProps, ReactAppPageState> {

  constructor(props: ReactAppPageProps) {
    super(props);
    this.state = {};
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
  protected onLocationHashChange(event: HashChangeEvent) {
    log.info("event ->", event.newURL);
    log.info("initLocationHash ->", getLocationHash());
  }

  protected getNestSideLayout() {
    return (
      <NestSideMenuLayout/>
    );
  }

  render() {
    // const {initLocationHash} = this.props;
    return this.getNestSideLayout();
  }
}

// ----------------------------------------------------------------------------------- 开始初始化应用
initAppPage();
const initLocationHash = getLocationHash();
const runtimeLayouts = layoutToRuntime(routerConfigs);
log.info("initLocationHash ->", initLocationHash);
log.info("layoutSettings ->", layoutSettings);
log.info("runtimeLayouts ->", runtimeLayouts);
ReactDOM.render(<ReactAppPage initLocationHash={initLocationHash} layoutSettings={layoutSettings} runtimeLayouts={runtimeLayouts}/>, $rootMounted)
