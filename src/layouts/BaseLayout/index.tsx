import React from 'react';
// import lodash from 'lodash';
import classNames from "classnames";
import { CloseOutlined } from '@ant-design/icons';
import Tabs, { TabPane } from 'rc-tabs';

import SimpleBarReact from 'simplebar-react';

import { PageContent } from "@/components/Layout/PageContent";
import { loadPageByPath } from "@/utils/amis-utils";
import styles from './index.less';

interface BaseLayoutProps extends LayoutPageComponentProps {
}

interface BaseLayoutState {
  /**
   * 对页签页面Map
   * <pre>
   *   Map<一级菜单key, 过滤值>
   * </pre>
   */
  tabPanes: Array<React.ReactElement>;
  /** 当前活动的页签 */
  activeTabPane?: string;
}

class BaseLayout<P extends BaseLayoutProps, S extends BaseLayoutState> extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
  }

  /** 页面内容 */
  protected getPageContent() {
    const {tabPanes, activeTabPane} = this.state;
    return (
      <PageContent>
        <Tabs
          className={styles.tabs}
          animated={false}
          tabPosition={"top"}
          tabBarGutter={8}
          activeKey={activeTabPane}
          tabBarExtraContent={<div>更多</div>}
          editable={{
            onEdit: (type, info) => {
              if (!info.key) return;
              if (type === "remove") {
                const newTabPanes = tabPanes.filter(item => info.key !== item.key);
                this.setState({tabPanes: newTabPanes});
              }
            },
            showAdd: false,
            removeIcon: <CloseOutlined/>,
          }}
        >
          {tabPanes}
        </Tabs>
      </PageContent>
    );
  }

  protected addTabPage(id: string, path: string) {
    const {tabPanes} = this.state;
    if (tabPanes.findIndex(item => item.key === `TabPaneKey-${id}`) === -1) {
      tabPanes.push((
        <TabPane key={`TabPaneKey-${id}`} tab={`TabPane-${id}`} forceRender={true} closable={true}>
          <SimpleBarReact className={classNames(styles.simpleBar)} autoHide={true}>
            <div id={`AmisId-${id}`} key={`AmisKey-${id}`}/>
          </SimpleBarReact>
        </TabPane>
      ));
    }
    this.setState(
      {tabPanes, activeTabPane: `TabPaneKey-${id}`},
      async () => await loadPageByPath(`AmisId-${id}`, path, {})
    );
  }
}

export { BaseLayoutProps, BaseLayoutState, BaseLayout };
