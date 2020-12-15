import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { $rootMounted, initAppPage } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';
import { logger } from '@/utils/logger';
import { layoutMatch, layoutToRuntime, RuntimeLayoutConfig } from "@/utils/router";
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
  locationHash: string;
  /** 运行时路由配置 */
  runtimeLayout?: RuntimeLayoutConfig;
}

class ReactAppPage extends Component<ReactAppPageProps, ReactAppPageState> {

  constructor(props: ReactAppPageProps) {
    super(props);
    const initLocationHash = getLocationHash();
    log.info("initLocationHash ->", initLocationHash);
    this.state = {
      locationHash: initLocationHash,
      runtimeLayout: layoutMatch(initLocationHash, props.runtimeLayouts),
    };
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
    log.info("event ->", event.newURL);
    log.info("locationHash ->", locationHash);
    this.setState({locationHash, runtimeLayout: layoutMatch(locationHash, runtimeLayouts)})
  }

  protected getNestSideLayout() {
    const {runtimeLayout} = this.state;
    log.info("runtimeLayout ->", runtimeLayout);
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
const runtimeLayouts = layoutToRuntime(routerConfigs);
log.info("layoutSettings ->", layoutSettings);
log.info("runtimeLayouts ->", runtimeLayouts);
ReactDOM.render(<ReactAppPage layoutSettings={layoutSettings} runtimeLayouts={runtimeLayouts}/>, $rootMounted)
