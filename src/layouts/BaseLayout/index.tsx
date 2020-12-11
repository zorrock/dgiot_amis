import React from 'react';
// import lodash from 'lodash';
import { PageContent } from "@/components/Layout/PageContent";
// import styles from './index.less';

interface BaseLayoutProps extends LayoutPageComponentProps {
  // // ----------------------------------------------------------------------------------- 主配置
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
  // pageContentOnCloseTab?: (multiTab: MultiTabItem) => void;
  // /** 单击MultiTabItem上的标题事件 */
  // pageContentOnClickTab?: (multiTab: MultiTabItem) => void;
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
}

interface BaseLayoutState {
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

// type DefaultSideMenuBottomRender = (
//   props: Omit<SideMenuProps, 'topRender'>,
//   className: string,
//   elementMap: Map<String, React.ReactNode>,
//   currentFirstMenu: RuntimeMenuItem,
// ) => React.ReactNode;

// /** 二级菜单自定义侧边栏顶部部区域默认渲染逻辑 */
// type DefaultSideMenuTopRender = (
//   props: Omit<SideMenuProps, 'topRender'>,
//   className: string,
//   elementMap: Map<String, React.ReactNode>,
//   currentFirstMenu: RuntimeMenuItem,
// ) => React.ReactNode;

class BaseLayout<P extends BaseLayoutProps, S extends BaseLayoutState> extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
    // this.layoutMenuData = this.getLayoutMenuData(props);
  }

  // public shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
  //   let res: boolean = true;
  //   if (super.shouldComponentUpdate) res = super.shouldComponentUpdate(nextProps, nextState, nextContext);
  //   if (res) this.layoutMenuData = this.getLayoutMenuData(nextProps);
  //   return res;
  // }

  /** 页面内容 */
  protected getPageContent() {
    // const { layoutMenuData, multiTabNavHasScrollMap, multiTabScrollLeftMap } = this;
    const {children} = this.props;
    return (
      <PageContent>
        {children}
      </PageContent>
    );
  }
}

export { BaseLayoutProps, BaseLayoutState, BaseLayout };
