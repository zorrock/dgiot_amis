import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { BaseLayout, BaseLayoutState } from "@/layouts/BaseLayout";
import styles from './index.less';

export interface NestSideMenuLayoutProps extends LayoutPageComponentProps {
  // ----------------------------------------------------------------------------------- NestSideMenuLayout 主配置
  // ----------------------------------------------------------------------------------- NestSideMenuLayout 扩展配置
  /** 最外层Layout容器class样式 */
  layoutClassName?: string;
  /** 最外层Layout容器样式 */
  layoutStyle?: CSSProperties;
  /** GlobalSide容器class样式 */
  globalSideClassName?: string;
  /** GlobalSide容器样式 */
  globalSideStyle?: CSSProperties;
  /** 嵌套的Layout容器class样式 */
  nestLayoutClassName?: string;
  /** 嵌套的Layout容器样式 */
  nestLayoutStyle?: CSSProperties;
  /** 侧边栏二级菜单容器class样式 */
  sideClassName?: string;
  /** 侧边栏二级菜单容器样式 */
  sideStyle?: CSSProperties;
  /** 二级嵌套的Layout容器class样式 */
  twoLevelNestLayoutClassName?: string;
  /** 二级嵌套的Layout容器样式 */
  twoLevelNestLayoutStyle?: CSSProperties;
  /** Header容器class样式 */
  headerClassName?: string;
  /** Header容器样式 */
  headerStyle?: CSSProperties;
  /** Content容器class样式 */
  contentClassName?: string;
  /** Content容器样式 */
  contentStyle?: CSSProperties;
  /** Footer容器class样式 */
  footerClassName?: string;
  /** Footer容器样式 */
  footerStyle?: CSSProperties;
  // ----------------------------------------------------------------------------------- GlobalSide 配置
  // ----------------------------------------------------------------------------------- SideMenu 配置
  // ----------------------------------------------------------------------------------- GlobalHeader 配置
  // ----------------------------------------------------------------------------------- PageContent 配置
  // ----------------------------------------------------------------------------------- GlobalFooter 配置
  // -----------------------------------------------------------------------------------
}

export interface NestSideMenuLayoutState extends BaseLayoutState {

}

class NestSideMenuLayout extends BaseLayout<NestSideMenuLayoutProps, NestSideMenuLayoutState> {
  /** props的默认值 */
  static defaultProps: Readonly<Partial<NestSideMenuLayoutProps>> = {};

  constructor(props: NestSideMenuLayoutProps) {
    super(props);
    this.state = {
      tabPages: [],
      activePageKey: undefined,
    };
  }

  componentDidMount() {
  }

  /** 页面布局内容 */
  protected getLayoutPage() {
    const {
      layoutClassName, layoutStyle, globalSideClassName, globalSideStyle, nestLayoutClassName, nestLayoutStyle,
      sideClassName, sideStyle, twoLevelNestLayoutClassName, twoLevelNestLayoutStyle, headerClassName, headerStyle,
      contentClassName, contentStyle, footerClassName, footerStyle,
    } = this.props;
    return (
      <section className={classNames(styles.layout, layoutClassName)} style={layoutStyle}>
        <aside className={classNames(styles.firstSideMenuLayout, globalSideClassName)} style={globalSideStyle}>
          {/* TODO 全局侧边栏 - 一级菜单 */}
          <div>一级<br/>菜单</div>
        </aside>
        <section className={classNames(styles.nestLayout, nestLayoutClassName)} style={nestLayoutStyle}>
          <aside className={classNames(styles.layoutSide, sideClassName)} style={sideStyle}>
            {/* TODO 二级侧边栏 - 二级级菜单 */}
            <div>二级级菜单</div>
            <br/>
            <a onClick={() => this.addTabPage("1", "/amis/curd-00-schema.ts")}>简单CURD</a>
            <br/>
            <a onClick={() => this.addTabPage("2", "/amis/form-02-verify-schema.ts")}>简单表单</a>
            <br/>
            <a onClick={() => {
              window.location.hash = "#aaaa";
            }}>简单表单</a>
          </aside>
          <section className={classNames(styles.twoLevelNestLayout, twoLevelNestLayoutClassName)} style={twoLevelNestLayoutStyle}>
            <header className={classNames(styles.header, headerClassName)} style={headerStyle}>
              <div>页头</div>
            </header>
            <main className={classNames(styles.content, contentClassName)} style={contentStyle}>
              {this.getPageContent()}
            </main>
            <footer className={classNames(styles.footer, footerClassName)} style={footerStyle}>
              <div>页尾</div>
            </footer>
          </section>
        </section>
      </section>
    );
  }

  render() {
    return (
      <>
        {/*<Helmet>*/}
        {/*  <title>{getHtmlTitle(layoutMenuData, htmlTitleSuffix)}</title>*/}
        {/*</Helmet>*/}
        {this.getLayoutPage()}
      </>
    );
  }
}

export default NestSideMenuLayout;
