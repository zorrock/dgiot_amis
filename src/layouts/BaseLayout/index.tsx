import React, { CSSProperties } from 'react';
// import lodash from 'lodash';
import classNames from "classnames";
import { Helmet } from 'react-helmet';
import { CloseOutlined } from '@ant-design/icons';
import Tabs, { TabPane } from 'rc-tabs';
import SimpleBarReact from 'simplebar-react';
import { PageContent } from "@/components/Layout/PageContent";
import { GlobalFooter, GlobalFooterLink, GlobalFooterProps } from "@/components/Layout/GlobalFooter";
import { getHtmlTitle } from "@/components/Layout/utils/layouts-utils";
import { loadPageByPath } from "@/utils/amis-utils";
import styles from './index.less';
import { GlobalHeader, GlobalHeaderProps } from "@/components/Layout/GlobalHeader";

interface BaseLayoutProps extends LayoutPageComponentProps {
  // ----------------------------------------------------------------------------------- 基础配置
  /** html页面title后缀 */
  htmlTitleSuffix?: string;
  /** 页面加载状态 */
  loading?: boolean;
  /** 是否隐藏全局页头 */
  hideGlobalHeader?: boolean;
  /** 是否隐藏全局页脚 */
  hideGlobalFooter?: boolean;
  // ----------------------------------------------------------------------------------- GlobalHeader 配置
  /** 左侧区域class样式 */
  globalHeaderLeftClassName?: string;
  /** 左侧区域样式 */
  globalHeaderLeftStyle?: CSSProperties;
  /** 中间动态宽度区域class样式 */
  globalHeaderCentreClassName?: string;
  /** 中间动态宽度区域样式 */
  globalHeaderCentreStyle?: CSSProperties;
  /** 左侧区域class样式 */
  globalHeaderRightClassName?: string;
  /** 左侧区域样式 */
  globalHeaderRightStyle?: CSSProperties;
  /** 自定义左侧区域渲染逻辑 */
  globalHeaderLeftRender?: (props: Omit<GlobalHeaderProps, 'leftRender'>, defaultLeftClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  globalHeaderCentreRender?: (props: Omit<GlobalHeaderProps, 'centerRender'>, defaultCenterClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义右侧区域渲染逻辑 */
  globalHeaderRightRender?: (props: Omit<GlobalHeaderProps, 'rightRender'>, defaultRightClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义渲染逻辑 */
  globalHeaderRender?: (props: Omit<GlobalHeaderProps, 'headerRender'>) => React.ReactNode;
  // ----------------------------------------------------------------------------------- GlobalFooter 配置
  /** GlobalFooter 页脚链接 */
  globalFooterLinks?: GlobalFooterLink[] | false;
  /** GlobalFooter 页脚版权说明内容 */
  globalFooterCopyright?: React.ReactNode;
  /** GlobalFooter 自定义样式 */
  globalFooterStyle?: React.CSSProperties;
  /** GlobalFooter 自定义class样式 */
  globalFooterClassName?: string;
  /** GlobalFooter 自定义渲染逻辑 */
  globalFooterRender?: (props: Omit<GlobalFooterProps, 'footerRender'>) => React.ReactNode;
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

  /** 全局页头 */
  protected getGlobalHeader() {
    const {
      globalHeaderLeftClassName,
      globalHeaderLeftStyle,
      globalHeaderCentreClassName,
      globalHeaderCentreStyle,
      globalHeaderRightClassName,
      globalHeaderRightStyle,
      globalHeaderLeftRender,
      globalHeaderCentreRender,
      globalHeaderRightRender,
      globalHeaderRender,
    } = this.props;
    return (
      <GlobalHeader
        leftClassName={globalHeaderLeftClassName}
        leftStyle={globalHeaderLeftStyle}
        centerClassName={globalHeaderCentreClassName}
        centerStyle={globalHeaderCentreStyle}
        rightClassName={globalHeaderRightClassName}
        rightStyle={globalHeaderRightStyle}
        leftRender={globalHeaderLeftRender}
        centerRender={globalHeaderCentreRender}
        rightRender={globalHeaderRightRender}
        headerRender={globalHeaderRender}
      />
    );
  }

  /** 全局页脚 */
  protected getGlobalFooter() {
    const { globalFooterLinks, globalFooterCopyright, globalFooterStyle = {}, globalFooterClassName, globalFooterRender } = this.props;
    return (
      <GlobalFooter
        links={globalFooterLinks}
        copyright={globalFooterCopyright}
        style={globalFooterStyle}
        className={globalFooterClassName}
        footerRender={globalFooterRender}
      />
    );
  }

  /** 是否存在页脚(Footer容器) */
  public existsFooter() {
    const { globalFooterLinks, globalFooterCopyright } = this.props;
    return (globalFooterLinks && Array.isArray(globalFooterLinks) && globalFooterLinks.length > 0) || globalFooterCopyright;
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
