import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { $rootMounted, initAppPage } from '@/utils/amis-utils';
import { getLocationHash } from '@/utils/utils';
import { logger } from '@/utils/logger';
import { NestSideLayout } from '@/layouts/NestSideLayout';
import { LayoutConfig, layoutSettings, routerConfigs } from './router-config';

const log = logger.getLogger(__filename);

interface ReactAppPageProps {
  /** 初始化的Location Hash值 */
  initLocationHash?: string;
  /** 布局全局设置 */
  layoutSettings: LayoutSettings;
  /** 路由配置 */
  routerConfigs: LayoutConfig[];
}

interface ReactAppPageState {
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

  render() {
    return (
      <NestSideLayout>
        {/*<button onClick={() => this.setState({count: count + 1})}>{count}</button>*/}
        {/*<div data-a={count} id={this.amisMountedId}/>*/}
      </NestSideLayout>
    );
  }
}

// ----------------------------------------------------------------------------------- 开始初始化应用
initAppPage();
const initLocationHash = getLocationHash();
log.info("initLocationHash ->", initLocationHash);
log.info("layoutSettings ->", layoutSettings);
log.info("routerConfigs ->", routerConfigs);
ReactDOM.render(<ReactAppPage initLocationHash={initLocationHash} layoutSettings={layoutSettings} routerConfigs={routerConfigs}/>, $rootMounted);
