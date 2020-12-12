import React from 'react';
// import lodash from 'lodash';
import classNames from "classnames";
import { CloseOutlined } from '@ant-design/icons';
import Tabs, { TabPane } from 'rc-tabs';
import 'rc-tabs/assets/index.css';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import { PageContent } from "@/components/Layout/PageContent";
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
}

class BaseLayout<P extends BaseLayoutProps, S extends BaseLayoutState> extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
  }

  protected initTabPaneMap() {
    const {children} = this.props;
    const {tabPanes} = this.state;
    tabPanes.push((
      <TabPane forceRender={true} closable={true} tab="tab 1" key="1">
        first
      </TabPane>
    ));
    tabPanes.push((
      <TabPane forceRender={true} closable={true} tab="tab 2" key="2">
        second
      </TabPane>
    ));
    tabPanes.push((
      <TabPane forceRender={true} closable={true} tab="tab 3" key="3">
        <SimpleBarReact className={classNames(styles.simpleBar)} autoHide={true}>
          {children}
        </SimpleBarReact>
      </TabPane>
    ));
  }

  /** 页面内容 */
  protected getPageContent() {
    const {tabPanes} = this.state;
    return (
      <PageContent>
        <Tabs
          className={styles.tabs}
          animated={false}
          tabBarGutter={8}
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
}

export { BaseLayoutProps, BaseLayoutState, BaseLayout };
