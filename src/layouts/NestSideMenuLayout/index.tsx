import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { BaseLayout, BaseLayoutProps, BaseLayoutState } from "@/layouts/BaseLayout";
import styles from './index.less';
import { GlobalSide, GlobalSideProps, SideFirstMenuClickParam, SideFirstMenuMode, SideFirstMenuSelectParam } from "@/components/Layout/GlobalSide";
import { AntdMenuProps } from "@/components/Layout/layout-types";
import { logger } from "@/utils/logger";
import { getCurrentFirstMenuKey } from "@/components/Layout/utils/layouts-utils";

const log = logger.getLogger("src/layouts/NestSideMenuLayout/index.tsx");

interface NestSideMenuLayoutProps extends BaseLayoutProps {
  // ----------------------------------------------------------------------------------- NestSideMenuLayout 主配置
  /** Header高度(建议 32 ~ 64) */
  headerHeight: number;
  /** 侧边栏宽度(二级菜单宽度，建议 160 ~ 256) */
  sideMenuWidth: number;
  /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  menuIconScriptUrl?: string;
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
  /** 系统logo图片(32 x 32) */
  globalSideLogo?: React.ReactNode | false;
  /** 点击系统logo事件 */
  globalSideOnLogoClick?: () => void;
  /** 自定义logo class样式 */
  globalSideLogoClassName?: string;
  /** 自定义logo样式 */
  globalSideLogoStyle?: CSSProperties;
  /** 菜单模式 */
  globalSideMenuMode?: SideFirstMenuMode;
  /** 菜单模式是"CustomMenu"时, 一级菜单的宽度 */
  globalSideMenuWidth?: number;
  /** 初始选中的菜单项 key 数组 */
  globalSideDefaultSelectedKeys?: string[];
  /** 当前选中的菜单项 key 数组 */
  globalSideSelectedKeys?: string[];
  /** 自定义渲染菜单项 */
  globalSideMenuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  /** 菜单被选中的事件(用于处理菜单跳转) */
  globalSideOnMenuSelect?: (param: SideFirstMenuSelectParam) => void;
  /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
  globalSideOnMenuClick?: (param: SideFirstMenuClickParam) => void;
  /** 自定义菜单class样式 */
  globalSideMenuClassName?: string;
  /** 自定义菜单样式 */
  globalSideMenuStyle?: CSSProperties;
  /** 自定义菜单项class样式 */
  globalSideMenuItemClassName?: string;
  /** 自定义菜单项样式 */
  globalSideMenuItemStyle?: CSSProperties;
  /** 自定义antd Menu 组件属性 */
  globalSideMenuProps?: AntdMenuProps;
  /** 上部区域class样式 */
  globalSideTopClassName?: string;
  /** 上部区域样式 */
  globalSideTopStyle?: CSSProperties;
  /** 中间菜单区域class样式 */
  globalSideCentreClassName?: string;
  /** 中间菜单区域样式 */
  globalSideCentreStyle?: CSSProperties;
  /** 底部区域class样式 */
  globalSideBottomClassName?: string;
  /** 底部区域样式 */
  globalSideBottomStyle?: CSSProperties;
  /** 自定义顶部区域渲染逻辑 */
  globalSideTopRender?: (props: Omit<GlobalSideProps, 'topRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  globalSideCentreRender?: (props: Omit<GlobalSideProps, 'centreRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义底部区域渲染逻辑 */
  globalSideBottomRender?: (props: Omit<GlobalSideProps, 'bottomRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义渲染逻辑 */
  globalSideGlobalSideRender?: (props: Omit<GlobalSideProps, 'globalSideRender'>) => React.ReactNode;
  /** 是否强制隐藏滚动条 */
  globalSideForceHideScrollbar?: boolean;
  /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  globalSideAutoHideScrollbar?: boolean;
  /** 自定义美化滚动条class样式 */
  globalSideScrollbarClassName?: string;
  // ----------------------------------------------------------------------------------- SideMenu 配置


  // ----------------------------------------------------------------------------------- PageContent 配置


  // -----------------------------------------------------------------------------------
}

interface NestSideMenuLayoutState extends BaseLayoutState {
}

class NestSideMenuLayout extends BaseLayout<NestSideMenuLayoutProps, NestSideMenuLayoutState> {
  /** props的默认值 */
  static defaultProps: Readonly<Partial<NestSideMenuLayoutProps>> = {
    headerHeight: 40,

  };

  constructor(props: NestSideMenuLayoutProps) {
    super(props);
    this.state = {
      tabPages: [],
      activePageKey: undefined,
    };
  }

  componentDidMount() {
  }

  /** 全局侧边栏(一级菜单) */
  protected getGlobalSide() {
    const {layoutMenuData} = this.props;
    const {
      menuIconScriptUrl,
      globalSideLogo, globalSideOnLogoClick, globalSideLogoClassName, globalSideLogoStyle, globalSideMenuMode, globalSideDefaultSelectedKeys,
      globalSideSelectedKeys, globalSideMenuItemRender, globalSideOnMenuSelect, globalSideOnMenuClick, globalSideMenuClassName, globalSideMenuStyle,
      globalSideMenuItemClassName, globalSideMenuItemStyle, globalSideMenuProps, globalSideTopClassName, globalSideTopStyle, globalSideCentreClassName,
      globalSideCentreStyle, globalSideBottomClassName, globalSideBottomStyle, globalSideTopRender, globalSideCentreRender, globalSideBottomRender,
      globalSideGlobalSideRender, globalSideForceHideScrollbar, globalSideAutoHideScrollbar, globalSideScrollbarClassName,
    } = this.props;
    // 计算 defaultSelectedKeys selectedKeys
    // 事件 onMenuSelect
    // 扩展 menuProps? rightRender!
    let defaultSelectedKeys: string[] | undefined;
    let selectedKeys: string[] | undefined;
    const currentFirstMenuKey = getCurrentFirstMenuKey(layoutMenuData.currentMenu);
    if (currentFirstMenuKey) {
      defaultSelectedKeys = [currentFirstMenuKey];
      selectedKeys = [currentFirstMenuKey];
    }
    log.info("[getGlobalHeader] currentMenu -> ", layoutMenuData.currentMenu);
    log.info("[getGlobalHeader] selectedKeys -> ", selectedKeys);
    return (
      <GlobalSide
        logo={globalSideLogo}
        onLogoClick={globalSideOnLogoClick}
        logoClassName={globalSideLogoClassName}
        logoStyle={globalSideLogoStyle}
        menuMode={globalSideMenuMode}
        layoutMenuData={layoutMenuData}
        menuIconScriptUrl={menuIconScriptUrl}
        defaultSelectedKeys={globalSideDefaultSelectedKeys || defaultSelectedKeys}
        selectedKeys={globalSideSelectedKeys || selectedKeys}
        menuItemRender={globalSideMenuItemRender}
        onMenuSelect={(param) => {
          if (globalSideOnMenuSelect instanceof Function) globalSideOnMenuSelect(param);
          // this.firstMenuOnSelect(param);
        }}
        onMenuClick={globalSideOnMenuClick}
        menuClassName={globalSideMenuClassName}
        menuStyle={globalSideMenuStyle}
        menuItemClassName={globalSideMenuItemClassName}
        menuItemStyle={globalSideMenuItemStyle}
        menuProps={globalSideMenuProps}
        topClassName={globalSideTopClassName}
        topStyle={globalSideTopStyle}
        centreClassName={globalSideCentreClassName}
        centreStyle={globalSideCentreStyle}
        bottomClassName={globalSideBottomClassName}
        bottomStyle={globalSideBottomStyle}
        topRender={globalSideTopRender}
        centreRender={globalSideCentreRender}
        bottomRender={globalSideBottomRender}
        globalSideRender={globalSideGlobalSideRender}
        forceHideScrollbar={globalSideForceHideScrollbar}
        autoHideScrollbar={globalSideAutoHideScrollbar}
        scrollbarClassName={globalSideScrollbarClassName}
      />
    );
  }

  /** 页面布局内容 */
  protected getLayoutPage() {
    const {
      hideGlobalHeader, hideGlobalFooter, headerHeight, globalSideMenuMode, globalSideMenuWidth,
      layoutClassName, layoutStyle, globalSideClassName, globalSideStyle, nestLayoutClassName, nestLayoutStyle,
      sideClassName, sideStyle, twoLevelNestLayoutClassName, twoLevelNestLayoutStyle, headerClassName, headerStyle,
      contentClassName, contentStyle, footerClassName, footerStyle,
    } = this.props;
    return (
      <section className={classNames(styles.layout, layoutClassName)} style={layoutStyle}>
        <aside
          className={classNames(styles.firstSideMenuLayout, globalSideClassName)}
          style={{...(globalSideMenuMode === SideFirstMenuMode.CustomMenu ? {width: globalSideMenuWidth} : {}), ...globalSideStyle}}
        >
          {/* 全局侧边栏 - 一级菜单 */}
          {this.getGlobalSide()}
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
            {/* 全局页头 */}
            {
              !hideGlobalHeader &&
              <header
                className={classNames(styles.header, headerClassName)}
                style={{...headerStyle, ...(headerHeight ? {height: headerHeight, lineHeight: `${headerHeight}px`} : {})}}
              >
                {this.getGlobalHeader()}
              </header>
            }
            {/* 页面内容 */}
            <main className={classNames(styles.content, contentClassName)} style={contentStyle}>
              {this.getPageContent()}
            </main>
            {/* 全局页脚 */}
            {
              !hideGlobalFooter && this.existsFooter() &&
              <footer className={classNames(styles.footer, footerClassName)} style={footerStyle}>
                {this.getGlobalFooter()}
              </footer>
            }
          </section>
        </section>
      </section>
    );
  }

  render() {
    return (
      <>
        {this.getHtmlTitle()}
        {this.getLayoutPage()}
      </>
    );
  }
}

export { NestSideMenuLayoutProps, NestSideMenuLayoutState, NestSideMenuLayout };
