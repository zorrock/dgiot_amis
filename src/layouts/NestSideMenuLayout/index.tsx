import React, { CSSProperties } from 'react';
import classNames from 'classnames';
// import { injectIntl } from 'umi';
// import { Layout } from 'antd';
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
// import { GlobalConfigContext } from '@/components/Layout/utils/menu-data';
// import { getCurrentFirstMenu, getCurrentFirstMenuKey, getHtmlTitle } from '@/components/Layout/utils/layouts-utils';
// import { BreadcrumbRoute } from '@/components/Layout/utils/breadcrumb';
// import {
//   AntdBreadcrumbProps,
//   AntdInputSearchProps,
//   AntdMenuClickParam,
//   AntdMenuProps,
//   AntdMenuTheme,
//   AntdPageHeaderProps,
//   AntdSiderProps,
//   AntdTagType,
//   FormatMessage,
//   IntlShape,
// } from '@/components/Layout/layout-types';
// import {
//   GlobalFooterLink,
//   GlobalFooterProps,
//   GlobalHeader,
//   GlobalHeaderProps,
//   GlobalSide,
//   GlobalSideProps,
//   MoreButtonEventKey,
//   MultiTabNavProps,
//   PageHeaderModel,
//   SideFirstMenuClickParam,
//   SideFirstMenuMode,
//   SideFirstMenuSelectParam,
//   SideMenuProps,
//   SideSecondMenuClickParam,
//   SideSecondMenuOpenChangeParam,
//   SideSecondMenuSelectParam,
// } from '@/components/Layout';
// import { BaseLayout, DefaultSideMenuTopRender } from '@/layouts/BaseLayout';
import styles from './index.less';

export interface NestSideMenuLayoutProps extends LayoutPageComponentProps {
  // // ----------------------------------------------------------------------------------- NestSideMenuLayout 主配置
  // /** html页面title后缀 */
  // htmlTitleSuffix?: string;
  // // /** 页面加载状态 */
  // // loading?: boolean;
  // /** 是否隐藏全局页头 */
  // hideGlobalHeader?: boolean;
  // /** 是否隐藏全局页脚 */
  // hideGlobalFooter?: boolean;
  // /** Header高度(建议 32 ~ 64) */
  // headerHeight: number;
  // /** 侧边栏宽度(二级菜单宽度，建议 160 ~ 256) */
  // sideMenuWidth: number;
  // /** 菜单-是否启用多语言 */
  // enableLocale?: boolean;
  // /** 菜单-默认展开子菜单 */
  // defaultOpen?: boolean;
  // /** 国际化实现 */
  // formatMessage?: FormatMessage;
  // /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  // menuIconScriptUrl?: string;
  // /** 自定义 LayoutMenuData 数据处理 */
  // layoutMenuDataInterceptor?: (configContext: GlobalConfigContext, location: UmiLocation, rootRouter: RuntimeRouter, layoutMenuData: LayoutMenuData) => LayoutMenuData;
  // /** 自定义 BreadcrumbRoutes 数据处理 */
  // breadcrumbRoutesInterceptor?: (layoutMenuData: LayoutMenuData, routes: BreadcrumbRoute[]) => BreadcrumbRoute[];
  // // ----------------------------------------------------------------------------------- NestSideMenuLayout 扩展配置
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
  // /** 侧边栏二级菜单容器自定义SideProps */
  // sideProps?: AntdSiderProps;
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
  // // ----------------------------------------------------------------------------------- GlobalSide 配置
  // /** 系统logo图片(32 x 32) */
  // globalSideLogo?: React.ReactNode | false;
  // /** 点击系统logo事件 */
  // globalSideOnLogoClick?: () => void;
  // /** 自定义logo class样式 */
  // globalSideLogoClassName?: string;
  // /** 自定义logo样式 */
  // globalSideLogoStyle?: CSSProperties;
  // /** 菜单模式 */
  // globalSideMenuMode?: SideFirstMenuMode;
  // /** 菜单模式是"CustomMenu"时, 一级菜单的宽度 */
  // globalSideMenuWidth?: number;
  // /** 初始选中的菜单项 key 数组 */
  // globalSideDefaultSelectedKeys?: string[];
  // /** 当前选中的菜单项 key 数组 */
  // globalSideSelectedKeys?: string[];
  // /** 自定义渲染菜单项 */
  // globalSideMenuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  // /** 菜单被选中的事件(用于处理菜单跳转) */
  // globalSideOnMenuSelect?: (param: SideFirstMenuSelectParam) => void;
  // /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
  // globalSideOnMenuClick?: (param: SideFirstMenuClickParam) => void;
  // /** 自定义菜单class样式 */
  // globalSideMenuClassName?: string;
  // /** 自定义菜单样式 */
  // globalSideMenuStyle?: CSSProperties;
  // /** 自定义菜单项class样式 */
  // globalSideMenuItemClassName?: string;
  // /** 自定义菜单项样式 */
  // globalSideMenuItemStyle?: CSSProperties;
  // /** 自定义antd Menu 组件属性 */
  // globalSideMenuProps?: AntdMenuProps;
  // /** 上部区域class样式 */
  // globalSideTopClassName?: string;
  // /** 上部区域样式 */
  // globalSideTopStyle?: CSSProperties;
  // /** 中间菜单区域class样式 */
  // globalSideCentreClassName?: string;
  // /** 中间菜单区域样式 */
  // globalSideCentreStyle?: CSSProperties;
  // /** 底部区域class样式 */
  // globalSideBottomClassName?: string;
  // /** 底部区域样式 */
  // globalSideBottomStyle?: CSSProperties;
  // /** 自定义顶部区域渲染逻辑 */
  // globalSideTopRender?: (props: Omit<GlobalSideProps, 'topRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义中间动态宽度区域渲染逻辑 */
  // globalSideCentreRender?: (props: Omit<GlobalSideProps, 'centreRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义底部区域渲染逻辑 */
  // globalSideBottomRender?: (props: Omit<GlobalSideProps, 'bottomRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义渲染逻辑 */
  // globalSideGlobalSideRender?: (props: Omit<GlobalSideProps, 'globalSideRender'>) => React.ReactNode;
  // /** 是否强制隐藏滚动条 */
  // globalSideForceHideScrollbar?: boolean;
  // /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  // globalSideAutoHideScrollbar?: boolean;
  // /** 自定义美化滚动条class样式 */
  // globalSideScrollbarClassName?: string;
  // // ----------------------------------------------------------------------------------- SideMenu 配置
  // /** 是否启用过滤菜单功能 */
  // sideMenuEnableSearchMenu?: boolean;
  // /** 默认的过滤菜单关键字 */
  // sideMenuSearchDefaultValue?: string;
  // /** 过滤菜单关键字 */
  // sideMenuSearchValue?: string;
  // /** 触发搜索菜单事件 */
  // sideMenuOnSearchMenu?: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
  // /** 过滤菜单关键字改变事件 */
  // sideMenuOnSearchValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  // /** 自定义搜索输入框class样式 */
  // sideMenuSearchClassName?: string;
  // /** 自定义搜索输入框样式 */
  // sideMenuSearchStyle?: CSSProperties;
  // /** 自定义搜索输入框属性 */
  // sideMenuSearchProps?: AntdInputSearchProps;
  // /** 侧边栏菜单主题 */
  // sideMenuTheme?: AntdMenuTheme;
  // /** 初始选中的菜单项 key 数组 */
  // sideMenuDefaultSelectedKeys?: string[];
  // /** 当前选中的菜单项 key 数组 */
  // sideMenuSelectedKeys?: string[];
  // /** 初始展开的 SubMenu 菜单项 key 数组 */
  // sideMenuDefaultOpenKeys?: string[];
  // /** 当前展开的 SubMenu 菜单项 key 数组 */
  // sideMenuOpenKeys?: string[];
  // /** 自定义渲染菜单项 */
  // sideMenuMenuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  // /** 自定义渲染目录菜单 */
  // sideMenuMenuFolderRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  // /** 自定义渲染分组菜单 */
  // sideMenuMenuItemGroupRender?: (menuGroup: RuntimeMenuItem[], groupName: string) => React.ReactNode;
  // /** 菜单被选中的事件(用于处理菜单跳转) */
  // sideMenuOnMenuSelect?: (param: SideSecondMenuSelectParam) => void;
  // /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
  // sideMenuOnMenuClick?: (param: SideSecondMenuClickParam) => void;
  // /** 菜单SubMenu展开/关闭的事件(用于保存菜单展开状态) */
  // sideMenuOnMenuOpenChange?: (param: SideSecondMenuOpenChangeParam) => void;
  // /** 点击子菜单(SubMenu)标题的事件 */
  // sideMenuOnSubMenuTitleClick?: () => void;
  // /** 自定义菜单class样式 */
  // sideMenuMenuClassName?: string;
  // /** 自定义菜单样式 */
  // sideMenuMenuStyle?: CSSProperties;
  // /** 自定义菜单项class样式 */
  // sideMenuMenuItemClassName?: string;
  // /** 自定义菜单项样式 */
  // sideMenuMenuItemStyle?: CSSProperties;
  // /** 自定义antd Menu 组件属性 */
  // sideMenuMenuProps?: AntdMenuProps;
  // /** 上部区域class样式 */
  // sideMenuTopClassName?: string;
  // /** 上部区域样式 */
  // sideMenuTopStyle?: CSSProperties;
  // /** 中间菜单区域class样式 */
  // sideMenuCentreClassName?: string;
  // /** 中间菜单区域样式 */
  // sideMenuCentreStyle?: CSSProperties;
  // /** 底部区域class样式 */
  // sideMenuBottomClassName?: string;
  // /** 底部区域样式 */
  // sideMenuBottomStyle?: CSSProperties;
  // /** 自定义顶部区域渲染逻辑 */
  // sideMenuTopRender?: (props: Omit<SideMenuProps, 'topRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义中间动态宽度区域渲染逻辑 */
  // sideMenuCentreRender?: (props: Omit<SideMenuProps, 'centreRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义底部区域渲染逻辑 */
  // sideMenuBottomRender?: (props: Omit<SideMenuProps, 'bottomRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义渲染逻辑 */
  // sideMenuRender?: (props: Omit<SideMenuProps, 'sideMenuRender'>) => React.ReactNode;
  // /** 是否美化滚动条 */
  // sideMenuBeautifyScrollbar?: boolean;
  // /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  // sideMenuAutoHideScrollbar?: boolean;
  // /** 自定义美化滚动条class样式 */
  // sideMenuScrollbarClassName?: string;
  // // ----------------------------------------------------------------------------------- GlobalHeader 配置
  // /** 左侧区域class样式 */
  // globalHeaderLeftClassName?: string;
  // /** 左侧区域样式 */
  // globalHeaderLeftStyle?: CSSProperties;
  // /** 中间动态宽度区域class样式 */
  // globalHeaderCentreClassName?: string;
  // /** 中间动态宽度区域样式 */
  // globalHeaderCentreStyle?: CSSProperties;
  // /** 左侧区域class样式 */
  // globalHeaderRightClassName?: string;
  // /** 左侧区域样式 */
  // globalHeaderRightStyle?: CSSProperties;
  // /** 自定义左侧区域渲染逻辑 */
  // globalHeaderLeftRender?: (props: Omit<GlobalHeaderProps, 'leftRender'>, defaultLeftClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义中间动态宽度区域渲染逻辑 */
  // globalHeaderCentreRender?: (props: Omit<GlobalHeaderProps, 'centerRender'>, defaultCenterClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义右侧区域渲染逻辑 */
  // globalHeaderRightRender?: (props: Omit<GlobalHeaderProps, 'rightRender'>, defaultRightClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义渲染逻辑 */
  // globalHeaderRender?: (props: Omit<GlobalHeaderProps, 'headerRender'>) => React.ReactNode;
  // // ----------------------------------------------------------------------------------- PageContent 配置
  // /** PageHeader模式 */
  // pageContentPageHeaderModel?: PageHeaderModel;
  // /** pageHeaderModel="MultiTab"时，是否启用 PageHeader 组件 */
  // pageContentEnablePageHeader?: boolean;
  // /** 是否强制隐藏 MultiTab */
  // pageContentForceHideMultiTab?: boolean;
  // /** 页签数据 */
  // pageContentTabsData?: MultiTabItem[];
  // /** 是否显示跳回首页按钮 */
  // pageContentShowHomeButton?: boolean;
  // /** 是否显示更多按钮按钮 */
  // pageContentShowMoreButton?: boolean;
  // /** 点击跳回首页按钮事件 */
  // pageContentOnClickHomeButton?: () => void;
  // /** 点击更多按钮项事件 */
  // pageContentOnClickMoreButton?: (param: AntdMenuClickParam, eventKey: MoreButtonEventKey) => void;
  // /** 点击MultiTabItem上的关闭按钮事件 */
  // pageContentOnCloseTab?: (tab: MultiTabItem) => void;
  // /** 单击MultiTabItem上的标题事件 */
  // pageContentOnClickTab?: (tab: MultiTabItem) => void;
  // /** MultiTabNav class样式 */
  // pageContentMultiTabNavClassName?: string;
  // /** MultiTabNav样式 */
  // pageContentMultiTabNavStyle?: CSSProperties;
  // /** 左侧区域class样式 */
  // pageContentLeftClassName?: string;
  // /** 左侧区域样式 */
  // pageContentLeftStyle?: CSSProperties;
  // /** 中间动态宽度区域class样式 */
  // pageContentCentreClassName?: string;
  // /** 中间动态宽度区域样式 */
  // pageContentCentreStyle?: CSSProperties;
  // /** 左侧区域class样式 */
  // pageContentRightClassName?: string;
  // /** 左侧区域样式 */
  // pageContentRightStyle?: CSSProperties;
  // /** 多页签Tab class样式 */
  // pageContentTabClassName?: string;
  // /** 多页签Tab样式 */
  // pageContentTabStyle?: CSSProperties;
  // /** 多页签active Tab class样式 */
  // pageContentTabActiveClassName?: string;
  // /** Tab标题class样式 */
  // pageContentTabTitleClassName?: string;
  // /** Tab标题样式 */
  // pageContentTabTitleStyle?: CSSProperties;
  // /** Tab关闭按钮class样式 */
  // pageContentTabCloseClassName?: string;
  // /** Tab关闭按钮样式 */
  // pageContentTabCloseStyle?: CSSProperties;
  // /** 自定义左侧区域渲染逻辑 */
  // pageContentLeftRender?: (props: Omit<MultiTabNavProps, 'leftRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义右侧区域渲染逻辑 */
  // pageContentRightRender?: (props: Omit<MultiTabNavProps, 'rightRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义多页签渲染 */
  // pageContentTabRender?: (props: Omit<MultiTabNavProps, 'tabRender'>, tabItem: MultiTabItem, elementMap: Map<String, React.ReactNode>) => Map<String, React.ReactNode>;
  // /** 自定义当前选中页签渲染 */
  // pageContentActiveTabRender?: (props: Omit<MultiTabNavProps, 'activeTabRender'>, tabItem: MultiTabItem, elementMap: Map<String, React.ReactNode>) => Map<String, React.ReactNode>;
  // /** 是否强制隐藏 AntPageHeader */
  // pageContentForceHideAntPageHeader?: boolean;
  // /** 返回上一页 */
  // pageContentOnBack?: boolean | (() => void) | string | UmiLocation;
  // /** 页面标题 */
  // pageContentPageHeaderTitle?: React.ReactNode;
  // /** 页面描述 */
  // pageContentPageHeaderSubTitle?: React.ReactNode;
  // /** title 旁的 tag 列表 */
  // pageContentPageHeaderTags?: React.ReactElement<AntdTagType> | React.ReactElement<AntdTagType>[];
  // /** 面包屑配置 */
  // pageContentPageHeaderBreadcrumb?: AntdBreadcrumbProps;
  // /** PageHeader内容 */
  // pageContentPageHeaderContent?: React.ReactNode;
  // /** 操作区，位于 title 行的行尾 */
  // pageContentPageHeaderExtra?: React.ReactNode;
  // /** PageHeader 的页脚，一般用于渲染 TabBar */
  // pageContentPageHeaderFooter?: React.ReactNode;
  // /** PageHeader扩展属性 */
  // pageContentPageHeaderProps?: AntdPageHeaderProps;
  // /** Ant PageHeader组件class样式 */
  // pageContentPageHeaderClassName?: string;
  // /** Ant PageHeader组件样式 */
  // pageContentPageHeaderStyle?: CSSProperties;
  // /** 是否美化滚动条 */
  // pageContentBeautifyScrollbar?: boolean;
  // /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  // pageContentAutoHideScrollbar?: boolean;
  // /** 自定义美化滚动条class样式 */
  // pageContentScrollbarClassName?: string;
  // /** 页面class样式 */
  // pageContentContentClassName?: string;
  // /** 页面样式 */
  // pageContentContentStyle?: CSSProperties;
  // // ----------------------------------------------------------------------------------- GlobalFooter 配置
  // /** GlobalFooter 页脚链接 */
  // globalFooterLinks?: GlobalFooterLink[] | false;
  // /** GlobalFooter 页脚版权说明内容 */
  // globalFooterCopyright?: React.ReactNode;
  // /** GlobalFooter 自定义样式 */
  // globalFooterStyle?: React.CSSProperties;
  // /** GlobalFooter 自定义class样式 */
  // globalFooterClassName?: string;
  // /** GlobalFooter 自定义渲染逻辑 */
  // globalFooterRender?: (props: Omit<GlobalFooterProps, 'footerRender'>) => React.ReactNode;
  // // -----------------------------------------------------------------------------------
  // /** 通过react-intl注入的国际化api属性 */
  // intl: IntlShape;
}

export interface NestSideMenuLayoutState {
  // /** 菜单折叠状态(true:已折叠) */
  // menuCollapsed: boolean;
  // /**
  //  * 二级菜单展开状态
  //  * <pre>
  //  *   Map<一级菜单key, string[]>
  //  * </pre>
  //  */
  // sideMenuOpenKeysMap: Immutable.Map<string, string[]>;
  // /**
  //  * 二级菜单过滤关键字
  //  * <pre>
  //  *   Map<一级菜单key, 过滤值>
  //  * </pre>
  //  */
  // sideMenuSearchValueMap: Immutable.Map<string, string>;
}

class NestSideMenuLayout extends React.Component<NestSideMenuLayoutProps, NestSideMenuLayoutState> {
  /** props的默认值 */
  static defaultProps: Readonly<Partial<NestSideMenuLayoutProps>> = {
    // sideMenuWidth: 160,
    // sideMenuTheme: 'light',
    // defaultOpen: true,
    // globalSideMenuWidth: 96,
    // sideMenuEnableSearchMenu: false,
    // sideMenuBeautifyScrollbar: true,
    // sideMenuAutoHideScrollbar: true,
    // pageContentPageHeaderModel: PageHeaderModel.AntPageHeader,
    // pageContentEnablePageHeader: false,
  };

  constructor(props: NestSideMenuLayoutProps) {
    super(props);
    this.state = {
      // menuCollapsed: false,
      // sideMenuOpenKeysMap: Immutable.Map<string, string[]>(),
      // sideMenuSearchValueMap: Immutable.Map<string, string>(),
    };
  }


  /** 页面布局内容 */
  protected getLayoutPage() {
    const {
      layoutClassName,
      layoutStyle,
      globalSideClassName,
      globalSideStyle,
      nestLayoutClassName,
      nestLayoutStyle,
      sideClassName,
      sideStyle,
      twoLevelNestLayoutClassName,
      twoLevelNestLayoutStyle,
      headerClassName,
      headerStyle,
      contentClassName,
      contentStyle,
      footerClassName,
      footerStyle,
      children,
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
          </aside>
          <section className={classNames(styles.twoLevelNestLayout, twoLevelNestLayoutClassName)} style={twoLevelNestLayoutStyle}>
            <header className={classNames(styles.header, headerClassName)} style={headerStyle}>
              <div>页头</div>
            </header>
            <main className={classNames(styles.content, contentClassName)} style={contentStyle}>
              {children}
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
    // const { layoutMenuData } = this;
    // const { htmlTitleSuffix } = this.props;
    // console.log("index layoutMenuData -> ", layoutMenuData);
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
