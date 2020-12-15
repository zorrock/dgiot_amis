import React from 'react';
// import lodash from 'lodash';
import classNames from "classnames";
import { Helmet } from 'react-helmet';
import { CloseOutlined } from '@ant-design/icons';
import Tabs, { TabPane } from 'rc-tabs';
import SimpleBarReact from 'simplebar-react';
import { PageContent } from "@/components/Layout/PageContent";
import { loadPageByPath } from "@/utils/amis-utils";
import { getHtmlTitle } from "../utils/layouts-utils";
import styles from './index.less';

interface BaseLayoutProps extends LayoutPageComponentProps {
  /** html页面title后缀 */
  htmlTitleSuffix?: string;
  /** 页面加载状态 */
  loading?: boolean;
  /** 是否隐藏全局页头 */
  hideGlobalHeader?: boolean;
  /** 是否隐藏全局页脚 */
  hideGlobalFooter?: boolean;
}

interface BaseLayoutState {
  /**
   * 对页签页面Map
   * <pre>
   *   Map<一级菜单key, 过滤值>
   * </pre>
   */
  tabPages: Array<React.ReactElement>;
  /** 当前活动的页签 */
  activePageKey?: string;
}

class BaseLayout<P extends BaseLayoutProps, S extends BaseLayoutState> extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
  }

  /** 页面标题 */
  protected getHtmlTitle() {
    const {route, htmlTitleSuffix} = this.props;
    return (
      <Helmet>
        <title>{getHtmlTitle(route, htmlTitleSuffix)}</title>
      </Helmet>
    );
  }

  /** 页面内容 */
  protected getPageContent() {
    const {tabPages, activePageKey} = this.state;
    return (
      <PageContent>
        <Tabs
          className={styles.tabs}
          animated={false}
          tabPosition={"top"}
          tabBarGutter={8}
          activeKey={activePageKey}
          tabBarExtraContent={<div>更多</div>}
          onTabClick={activeKey => this.setState({activePageKey: activeKey})}
          editable={{
            onEdit: (type, info) => {
              if (!info.key) return;
              if (type === "remove") {
                const newTabPanes = tabPages.filter(item => info.key !== item.key);
                this.setState({tabPages: newTabPanes});
              }
            },
            showAdd: false,
            removeIcon: <CloseOutlined/>,
          }}
        >
          {tabPages}
        </Tabs>
      </PageContent>
    );
  }

  protected addTabPage(id: string, path: string) {
    const {tabPages} = this.state;
    if (tabPages.findIndex(item => item.key === `TabPaneKey-${id}`) === -1) {
      tabPages.push((
        <TabPane key={`TabPaneKey-${id}`} tab={`TabPane-${id}`} forceRender={true} closable={true}>
          <SimpleBarReact className={classNames(styles.simpleBar)} autoHide={true}>
            <div id={`AmisId-${id}`} key={`AmisKey-${id}`}/>
          </SimpleBarReact>
        </TabPane>
      ));
    }
    this.setState(
      {tabPages, activePageKey: `TabPaneKey-${id}`},
      async () => await loadPageByPath(`AmisId-${id}`, path, {})
    );
  }
}

export { BaseLayoutProps, BaseLayoutState, BaseLayout };
