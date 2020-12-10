// import React, { CSSProperties } from 'react';
// import Immutable from 'immutable';
// import lodash from 'lodash';
// import classNames from 'classnames';
// // import { message } from 'antd';
// // import { getPropOrStateValue } from '@/common';
// // import {
// //   GlobalFooter,
// //   GlobalFooterLink,
// //   GlobalFooterProps,
// //   HeaderFirstMenuSelectParam,
// //   MoreButtonEventKey,
// //   MultiTabNavProps,
// //   PageContent,
// //   PageHeaderModel,
// //   SideMenu,
// //   SideMenuProps,
// //   SideSecondMenuClickParam,
// //   SideSecondMenuOpenChangeParam,
// //   SideSecondMenuSelectParam,
// // } from '@/components/Layout';
// // import {
// //   AntdBreadcrumbProps,
// //   AntdInputSearchProps,
// //   AntdMenuClickParam,
// //   AntdMenuProps,
// //   AntdMenuTheme,
// //   AntdPageHeaderProps,
// //   AntdTagType,
// //   FormatMessage,
// // } from '@/components/Layout/layout-types';
// // import { getLayoutMenuData, GlobalConfigContext } from '@/components/Layout/utils/menu-data';
// // import { BreadcrumbRoute, getBreadcrumbRoutes } from '@/components/Layout/utils/breadcrumb';
// // import {
// //   breadcrumbItemRender,
// //   getCurrentFirstMenu,
// //   getCurrentFirstMenuKey,
// //   getDefaultOpenKeys,
// //   getFirstMenu,
// //   getFirstShowMenu,
// //   getHomeMultiTabItem,
// //   getMenuItemByKey,
// //   getSideMenuData,
// //   newMultiTabItem,
// //   pageJumpForLocation,
// //   pageJumpForRouter,
// // } from '@/components/Layout/utils/layouts-utils';
// import styles from './index.less';
//
// interface BaseLayoutProps extends LayoutPageComponentProps {
//   // // ----------------------------------------------------------------------------------- 主配置
//   // /** 侧边栏宽度(二级菜单宽度，建议 160 ~ 256) */
//   // sideMenuWidth: number;
//   // /** 菜单-是否启用多语言 */
//   // enableLocale?: boolean;
//   // /** 菜单-默认展开子菜单 */
//   // defaultOpen?: boolean;
//   // /** 国际化实现 */
//   // formatMessage?: FormatMessage;
//   // /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
//   // menuIconScriptUrl?: string;
//   // /** 自定义 LayoutMenuData 数据处理 */
//   // layoutMenuDataInterceptor?: (configContext: GlobalConfigContext, location: UmiLocation, rootRouter: RuntimeRouter, layoutMenuData: LayoutMenuData) => LayoutMenuData;
//   // /** 自定义 BreadcrumbRoutes 数据处理 */
//   // breadcrumbRoutesInterceptor?: (layoutMenuData: LayoutMenuData, routes: BreadcrumbRoute[]) => BreadcrumbRoute[];
//   // // ----------------------------------------------------------------------------------- SideMenu 配置
//   // /** 是否启用过滤菜单功能 */
//   // sideMenuEnableSearchMenu?: boolean;
//   // /** 默认的过滤菜单关键字 */
//   // sideMenuSearchDefaultValue?: string;
//   // /** 过滤菜单关键字 */
//   // sideMenuSearchValue?: string;
//   // /** 触发搜索菜单事件 */
//   // sideMenuOnSearchMenu?: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
//   // /** 过滤菜单关键字改变事件 */
//   // sideMenuOnSearchValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
//   // /** 自定义搜索输入框class样式 */
//   // sideMenuSearchClassName?: string;
//   // /** 自定义搜索输入框样式 */
//   // sideMenuSearchStyle?: CSSProperties;
//   // /** 自定义搜索输入框属性 */
//   // sideMenuSearchProps?: AntdInputSearchProps;
//   // /** 侧边栏菜单主题 */
//   // sideMenuTheme?: AntdMenuTheme;
//   // /** 初始选中的菜单项 key 数组 */
//   // sideMenuDefaultSelectedKeys?: string[];
//   // /** 当前选中的菜单项 key 数组 */
//   // sideMenuSelectedKeys?: string[];
//   // /** 初始展开的 SubMenu 菜单项 key 数组 */
//   // sideMenuDefaultOpenKeys?: string[];
//   // /** 当前展开的 SubMenu 菜单项 key 数组 */
//   // sideMenuOpenKeys?: string[];
//   // /** 自定义渲染菜单项 */
//   // sideMenuMenuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
//   // /** 自定义渲染目录菜单 */
//   // sideMenuMenuFolderRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
//   // /** 自定义渲染分组菜单 */
//   // sideMenuMenuItemGroupRender?: (menuGroup: RuntimeMenuItem[], groupName: string) => React.ReactNode;
//   // /** 菜单被选中的事件(用于处理菜单跳转) */
//   // sideMenuOnMenuSelect?: (param: SideSecondMenuSelectParam) => void;
//   // /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
//   // sideMenuOnMenuClick?: (param: SideSecondMenuClickParam) => void;
//   // /** 菜单SubMenu展开/关闭的事件(用于保存菜单展开状态) */
//   // sideMenuOnMenuOpenChange?: (param: SideSecondMenuOpenChangeParam) => void;
//   // /** 点击子菜单(SubMenu)标题的事件 */
//   // sideMenuOnSubMenuTitleClick?: () => void;
//   // /** 自定义菜单class样式 */
//   // sideMenuMenuClassName?: string;
//   // /** 自定义菜单样式 */
//   // sideMenuMenuStyle?: CSSProperties;
//   // /** 自定义菜单项class样式 */
//   // sideMenuMenuItemClassName?: string;
//   // /** 自定义菜单项样式 */
//   // sideMenuMenuItemStyle?: CSSProperties;
//   // /** 自定义antd Menu 组件属性 */
//   // sideMenuMenuProps?: AntdMenuProps;
//   // /** 上部区域class样式 */
//   // sideMenuTopClassName?: string;
//   // /** 上部区域样式 */
//   // sideMenuTopStyle?: CSSProperties;
//   // /** 中间菜单区域class样式 */
//   // sideMenuCentreClassName?: string;
//   // /** 中间菜单区域样式 */
//   // sideMenuCentreStyle?: CSSProperties;
//   // /** 底部区域class样式 */
//   // sideMenuBottomClassName?: string;
//   // /** 底部区域样式 */
//   // sideMenuBottomStyle?: CSSProperties;
//   // /** 自定义顶部区域渲染逻辑 */
//   // sideMenuTopRender?: (props: Omit<SideMenuProps, 'topRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
//   // /** 自定义中间动态宽度区域渲染逻辑 */
//   // sideMenuCentreRender?: (props: Omit<SideMenuProps, 'centreRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
//   // /** 自定义底部区域渲染逻辑 */
//   // sideMenuBottomRender?: (props: Omit<SideMenuProps, 'bottomRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
//   // /** 自定义渲染逻辑 */
//   // sideMenuRender?: (props: Omit<SideMenuProps, 'sideMenuRender'>) => React.ReactNode;
//   // /** 是否美化滚动条 */
//   // sideMenuBeautifyScrollbar?: boolean;
//   // /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
//   // sideMenuAutoHideScrollbar?: boolean;
//   // /** 自定义美化滚动条class样式 */
//   // sideMenuScrollbarClassName?: string;
//   // // ----------------------------------------------------------------------------------- PageContent 配置
//   // /** PageHeader模式 */
//   // pageContentPageHeaderModel?: PageHeaderModel;
//   // /** pageHeaderModel="MultiTab"时，是否启用 PageHeader 组件 */
//   // pageContentEnablePageHeader?: boolean;
//   // /** 是否强制隐藏 MultiTab */
//   // pageContentForceHideMultiTab?: boolean;
//   // /** 页签数据 */
//   // pageContentTabsData?: MultiTabItem[];
//   // /** 是否显示跳回首页按钮 */
//   // pageContentShowHomeButton?: boolean;
//   // /** 是否显示更多按钮按钮 */
//   // pageContentShowMoreButton?: boolean;
//   // /** 点击跳回首页按钮事件 */
//   // pageContentOnClickHomeButton?: () => void;
//   // /** 点击更多按钮项事件 */
//   // pageContentOnClickMoreButton?: (param: AntdMenuClickParam, eventKey: MoreButtonEventKey) => void;
//   // /** 点击MultiTabItem上的关闭按钮事件 */
//   // pageContentOnCloseTab?: (multiTab: MultiTabItem) => void;
//   // /** 单击MultiTabItem上的标题事件 */
//   // pageContentOnClickTab?: (multiTab: MultiTabItem) => void;
//   // /** MultiTabNav class样式 */
//   // pageContentMultiTabNavClassName?: string;
//   // /** MultiTabNav样式 */
//   // pageContentMultiTabNavStyle?: CSSProperties;
//   // /** 左侧区域class样式 */
//   // pageContentLeftClassName?: string;
//   // /** 左侧区域样式 */
//   // pageContentLeftStyle?: CSSProperties;
//   // /** 中间动态宽度区域class样式 */
//   // pageContentCentreClassName?: string;
//   // /** 中间动态宽度区域样式 */
//   // pageContentCentreStyle?: CSSProperties;
//   // /** 左侧区域class样式 */
//   // pageContentRightClassName?: string;
//   // /** 左侧区域样式 */
//   // pageContentRightStyle?: CSSProperties;
//   // /** 多页签Tab class样式 */
//   // pageContentTabClassName?: string;
//   // /** 多页签Tab样式 */
//   // pageContentTabStyle?: CSSProperties;
//   // /** 多页签active Tab class样式 */
//   // pageContentTabActiveClassName?: string;
//   // /** Tab标题class样式 */
//   // pageContentTabTitleClassName?: string;
//   // /** Tab标题样式 */
//   // pageContentTabTitleStyle?: CSSProperties;
//   // /** Tab关闭按钮class样式 */
//   // pageContentTabCloseClassName?: string;
//   // /** Tab关闭按钮样式 */
//   // pageContentTabCloseStyle?: CSSProperties;
//   // /** 自定义左侧区域渲染逻辑 */
//   // pageContentLeftRender?: (props: Omit<MultiTabNavProps, 'leftRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
//   // /** 自定义右侧区域渲染逻辑 */
//   // pageContentRightRender?: (props: Omit<MultiTabNavProps, 'rightRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
//   // /** 自定义多页签渲染 */
//   // pageContentTabRender?: (props: Omit<MultiTabNavProps, 'tabRender'>, tabItem: MultiTabItem, elementMap: Map<String, React.ReactNode>) => Map<String, React.ReactNode>;
//   // /** 自定义当前选中页签渲染 */
//   // pageContentActiveTabRender?: (props: Omit<MultiTabNavProps, 'activeTabRender'>, tabItem: MultiTabItem, elementMap: Map<String, React.ReactNode>) => Map<String, React.ReactNode>;
//   // /** 是否强制隐藏 AntPageHeader */
//   // pageContentForceHideAntPageHeader?: boolean;
//   // /** 返回上一页 */
//   // pageContentOnBack?: boolean | (() => void) | string | UmiLocation;
//   // /** 页面标题 */
//   // pageContentPageHeaderTitle?: React.ReactNode;
//   // /** 页面描述 */
//   // pageContentPageHeaderSubTitle?: React.ReactNode;
//   // /** title 旁的 tag 列表 */
//   // pageContentPageHeaderTags?: React.ReactElement<AntdTagType> | React.ReactElement<AntdTagType>[];
//   // /** 面包屑配置 */
//   // pageContentPageHeaderBreadcrumb?: AntdBreadcrumbProps;
//   // /** PageHeader内容 */
//   // pageContentPageHeaderContent?: React.ReactNode;
//   // /** 操作区，位于 title 行的行尾 */
//   // pageContentPageHeaderExtra?: React.ReactNode;
//   // /** PageHeader 的页脚，一般用于渲染 TabBar */
//   // pageContentPageHeaderFooter?: React.ReactNode;
//   // /** PageHeader扩展属性 */
//   // pageContentPageHeaderProps?: AntdPageHeaderProps;
//   // /** Ant PageHeader组件class样式 */
//   // pageContentPageHeaderClassName?: string;
//   // /** Ant PageHeader组件样式 */
//   // pageContentPageHeaderStyle?: CSSProperties;
//   // /** 是否美化滚动条 */
//   // pageContentBeautifyScrollbar?: boolean;
//   // /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
//   // pageContentAutoHideScrollbar?: boolean;
//   // /** 自定义美化滚动条class样式 */
//   // pageContentScrollbarClassName?: string;
//   // /** 页面class样式 */
//   // pageContentContentClassName?: string;
//   // /** 页面样式 */
//   // pageContentContentStyle?: CSSProperties;
//   // // ----------------------------------------------------------------------------------- GlobalFooter 配置
//   // /** GlobalFooter 页脚链接 */
//   // globalFooterLinks?: GlobalFooterLink[] | false;
//   // /** GlobalFooter 页脚版权说明内容 */
//   // globalFooterCopyright?: React.ReactNode;
//   // /** GlobalFooter 自定义样式 */
//   // globalFooterStyle?: React.CSSProperties;
//   // /** GlobalFooter 自定义class样式 */
//   // globalFooterClassName?: string;
//   // /** GlobalFooter 自定义渲染逻辑 */
//   // globalFooterRender?: (props: Omit<GlobalFooterProps, 'footerRender'>) => React.ReactNode;
// }
//
// interface BaseLayoutState {
//   // /** 菜单折叠状态(true:已折叠) */
//   // menuCollapsed: boolean;
//   // /**
//   //  * 二级菜单展开状态
//   //  * <pre>
//   //  *   Map<一级菜单key, string[]>
//   //  * </pre>
//   //  */
//   // sideMenuOpenKeysMap: Immutable.Map<string, string[]>;
//   // /**
//   //  * 二级菜单过滤关键字
//   //  * <pre>
//   //  *   Map<一级菜单key, 过滤值>
//   //  * </pre>
//   //  */
//   // sideMenuSearchValueMap: Immutable.Map<string, string>;
// }
//
// // type DefaultSideMenuBottomRender = (
// //   props: Omit<SideMenuProps, 'topRender'>,
// //   className: string,
// //   elementMap: Map<String, React.ReactNode>,
// //   currentFirstMenu: RuntimeMenuItem,
// // ) => React.ReactNode;
//
// // /** 二级菜单自定义侧边栏顶部部区域默认渲染逻辑 */
// // type DefaultSideMenuTopRender = (
// //   props: Omit<SideMenuProps, 'topRender'>,
// //   className: string,
// //   elementMap: Map<String, React.ReactNode>,
// //   currentFirstMenu: RuntimeMenuItem,
// // ) => React.ReactNode;
//
// class BaseLayout<P extends BaseLayoutProps, S extends BaseLayoutState> extends React.Component<P, S> {
//   /** 菜单数据 */
//   protected layoutMenuData: LayoutMenuData;
//
//   /**
//    * 二级菜单选中的key
//    * <pre>
//    *   Map<一级菜单key, { menuKey: string, location: UmiLocation }>
//    * </pre>
//    */
//   protected sideMenuSelectedKeysMap: Map<string, { menuKey: string; location: UmiLocation }> = new Map<string, { menuKey: string; location: UmiLocation }>();
//
//   /**
//    * 当前多标签页对应的TabsData
//    * <pre>
//    *   Map<一级菜单key, MultiTabItem[]>
//    * </pre>
//    */
//   protected multiTabsDataMap: Map<string, MultiTabItem[]> = new Map<string, MultiTabItem[]>();
//
//   /**
//    * 当前多标签页对应的MultiTabNav是否有滚动条
//    * <pre>
//    *   Map<一级菜单key, hasScroll>
//    * </pre>
//    */
//   protected multiTabNavHasScrollMap: Map<string, boolean> = new Map<string, boolean>();
//
//   /**
//    * 多页签容器scrollLeft值
//    * <pre>
//    *   Map<一级菜单key, 多页签容器scrollLeft值>
//    * </pre>
//    */
//   protected multiTabScrollLeftMap: Map<string, number> = new Map<string, number>();
//
//   constructor(props: P) {
//     super(props);
//     this.layoutMenuData = this.getLayoutMenuData(props);
//   }
//
//   public shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
//     let res: boolean = true;
//     if (super.shouldComponentUpdate) res = super.shouldComponentUpdate(nextProps, nextState, nextContext);
//     if (res) this.layoutMenuData = this.getLayoutMenuData(nextProps);
//     return res;
//   }
//
//   /** 侧边栏菜单(二级菜单) */
//   protected getSideMenu(defaultSideMenuBottomRender?: DefaultSideMenuBottomRender, defaultSideMenuTopRender?: DefaultSideMenuTopRender) {
//     const { layoutMenuData, sideMenuSelectedKeysMap } = this;
//     const { location, defaultOpen, sideMenuOnSearchMenu, sideMenuOnSearchValueChange, sideMenuOnMenuClick, sideMenuOnMenuOpenChange } = this.props;
//     const { sideMenuOpenKeysMap, sideMenuSearchValueMap } = this.state;
//     const menuCollapsed = this.getMenuCollapsed();
//     // 计算 searchDefaultValue searchValue currentPath menuData defaultSelectedKeys selectedKeys defaultOpenKeys openKeys
//     // 事件 onSearchMenu onSearchValueChange onMenuClick onMenuOpenChange
//     // 扩展 menuTheme? bottomRender scrollbarClassName?
//     if (!layoutMenuData.currentMenu) return undefined;
//     if (!layoutMenuData.showCurrentMenu) return undefined;
//     const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//     if (!currentFirstMenu) return undefined;
//     const searchValue = sideMenuSearchValueMap.get(currentFirstMenu.menuKey) || '';
//     const currentPath = layoutMenuData.currentPath;
//     const menuData = currentFirstMenu;
//     // 选中的菜单
//     const defaultSelectedKeys: string[] = [layoutMenuData.showCurrentMenu.menuKey];
//     const selectedKeys: string[] = [layoutMenuData.showCurrentMenu.menuKey];
//     // 保存当前二级菜单
//     sideMenuSelectedKeysMap.set(currentFirstMenu.menuKey, { menuKey: layoutMenuData.currentMenu.menuKey, location });
//     // 展开的菜单
//     let defaultOpenKeys: string[] | undefined;
//     let openKeys: string[] | undefined;
//     if (!menuCollapsed) {
//       defaultOpenKeys = getDefaultOpenKeys(defaultOpen ?? false, currentFirstMenu, layoutMenuData.currentMenu);
//       openKeys = sideMenuOpenKeysMap.get(currentFirstMenu.menuKey) || defaultOpenKeys;
//     }
//     let { sideMenuTopRender, sideMenuBottomRender } = this.props;
//     if (!sideMenuBottomRender && defaultSideMenuBottomRender instanceof Function) {
//       sideMenuBottomRender = (props, className, elementMap) => defaultSideMenuBottomRender!(props, className, elementMap, currentFirstMenu);
//     }
//     if (!sideMenuTopRender && defaultSideMenuTopRender instanceof Function) {
//       sideMenuTopRender = (props, className, elementMap) => defaultSideMenuTopRender!(props, className, elementMap, currentFirstMenu);
//     }
//     // console.log("[getSideMenu] currentShowMenu -> ", layoutMenuData.currentShowMenu);
//     // console.log("[getSideMenu] searchValue -> ", searchValue, sideMenuSelectedKeysMap);
//     return (
//       <SideMenu
//         menuCollapsed={menuCollapsed}
//         sideMenuWidth={this.props.sideMenuWidth}
//         enableSearchMenu={this.props.sideMenuEnableSearchMenu}
//         searchDefaultValue={this.props.sideMenuSearchDefaultValue}
//         searchValue={this.props.sideMenuSearchValue || searchValue}
//         onSearchMenu={(value, event) => {
//           if (sideMenuOnSearchMenu instanceof Function) sideMenuOnSearchMenu(value, event);
//           this.sideMenuOnSearchMenu(value, event);
//         }}
//         onSearchValueChange={(value, event) => {
//           if (sideMenuOnSearchValueChange instanceof Function) sideMenuOnSearchValueChange(value, event);
//           this.sideMenuOnSearchValueChange(value, event);
//         }}
//         searchClassName={this.props.sideMenuSearchClassName}
//         searchStyle={this.props.sideMenuSearchStyle}
//         searchProps={this.props.sideMenuSearchProps}
//         currentPath={currentPath}
//         menuData={getSideMenuData(menuData, searchValue)}
//         menuIconScriptUrl={this.props.menuIconScriptUrl}
//         menuTheme={this.props.sideMenuTheme}
//         defaultSelectedKeys={this.props.sideMenuDefaultSelectedKeys || defaultSelectedKeys}
//         selectedKeys={this.props.sideMenuSelectedKeys || selectedKeys}
//         defaultOpenKeys={this.props.sideMenuDefaultOpenKeys || defaultOpenKeys}
//         openKeys={this.props.sideMenuOpenKeys || openKeys}
//         menuItemRender={this.props.sideMenuMenuItemRender}
//         menuFolderRender={this.props.sideMenuMenuFolderRender}
//         menuItemGroupRender={this.props.sideMenuMenuItemGroupRender}
//         onMenuSelect={this.props.sideMenuOnMenuSelect}
//         onMenuClick={(param) => {
//           if (sideMenuOnMenuClick instanceof Function) sideMenuOnMenuClick(param);
//           this.sideMenuOnMenuClick(param);
//         }}
//         onMenuOpenChange={(param) => {
//           if (sideMenuOnMenuOpenChange instanceof Function) sideMenuOnMenuOpenChange(param);
//           this.sideMenuOnMenuOpenChange(param);
//         }}
//         onSubMenuTitleClick={this.props.sideMenuOnSubMenuTitleClick}
//         menuClassName={this.props.sideMenuMenuClassName}
//         menuStyle={this.props.sideMenuMenuStyle}
//         menuItemClassName={this.props.sideMenuMenuItemClassName}
//         menuItemStyle={this.props.sideMenuMenuItemStyle}
//         menuProps={this.props.sideMenuMenuProps}
//         topClassName={this.props.sideMenuTopClassName}
//         topStyle={this.props.sideMenuTopStyle}
//         centreClassName={this.props.sideMenuCentreClassName}
//         centreStyle={this.props.sideMenuCentreStyle}
//         bottomClassName={this.props.sideMenuBottomClassName}
//         bottomStyle={this.props.sideMenuBottomStyle}
//         topRender={sideMenuTopRender}
//         centreRender={this.props.sideMenuCentreRender}
//         bottomRender={sideMenuBottomRender}
//         sideMenuRender={this.props.sideMenuRender}
//         beautifyScrollbar={this.props.sideMenuBeautifyScrollbar}
//         autoHideScrollbar={this.props.sideMenuAutoHideScrollbar}
//         scrollbarClassName={this.props.sideMenuScrollbarClassName}
//       />
//     );
//   }
//
//   /** 页面内容 */
//   protected getPageContent() {
//     const { layoutMenuData, multiTabNavHasScrollMap, multiTabScrollLeftMap } = this;
//     const {
//       location,
//       menuIconScriptUrl,
//       breadcrumbRoutesInterceptor,
//       pageContentPageHeaderModel,
//       pageContentEnablePageHeader,
//       pageContentForceHideMultiTab,
//       pageContentTabsData,
//       pageContentShowHomeButton,
//       pageContentShowMoreButton,
//       pageContentOnClickHomeButton,
//       pageContentOnClickMoreButton,
//       pageContentOnCloseTab,
//       pageContentOnClickTab,
//       pageContentMultiTabNavClassName,
//       pageContentMultiTabNavStyle,
//       pageContentLeftClassName,
//       pageContentLeftStyle,
//       pageContentCentreClassName,
//       pageContentCentreStyle,
//       pageContentRightClassName,
//       pageContentRightStyle,
//       pageContentTabClassName,
//       pageContentTabStyle,
//       pageContentTabActiveClassName,
//       pageContentTabTitleClassName,
//       pageContentTabTitleStyle,
//       pageContentTabCloseClassName,
//       pageContentTabCloseStyle,
//       pageContentLeftRender,
//       pageContentRightRender,
//       pageContentTabRender,
//       pageContentActiveTabRender,
//       pageContentForceHideAntPageHeader,
//       pageContentOnBack,
//       pageContentPageHeaderTitle,
//       pageContentPageHeaderSubTitle,
//       pageContentPageHeaderTags,
//       pageContentPageHeaderBreadcrumb,
//       pageContentPageHeaderContent,
//       pageContentPageHeaderExtra,
//       pageContentPageHeaderFooter,
//       pageContentPageHeaderProps,
//       pageContentPageHeaderClassName,
//       pageContentPageHeaderStyle,
//       pageContentBeautifyScrollbar,
//       pageContentAutoHideScrollbar,
//       pageContentScrollbarClassName,
//       pageContentContentClassName,
//       pageContentContentStyle,
//       children,
//     } = this.props;
//     // 计算 forceHideMultiTab tabsData defaultHasScroll multiTabScrollLeft
//     // 事件 onClickHomeButton onClickMoreButton onCloseTab onClickTab hasScrollOnChange
//     let forceHideMultiTab: boolean | undefined;
//     let tabsData: MultiTabItem[] = [];
//     let defaultHasScroll: boolean = false;
//     let multiTabScrollLeft: number = 0;
//     if (pageContentPageHeaderModel === PageHeaderModel.MultiTab) {
//       // 计算 forceHideMultiTab
//       const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//       forceHideMultiTab = !currentFirstMenu || !currentFirstMenu.children || currentFirstMenu.children.length <= 0;
//       // 计算 tabsData
//       tabsData = this.addCurrentActiveTab();
//       // 计算 defaultHasScroll multiTabScrollLeft
//       if (currentFirstMenu) {
//         defaultHasScroll = multiTabNavHasScrollMap.get(currentFirstMenu.menuKey) || false;
//         multiTabScrollLeft = multiTabScrollLeftMap.get(currentFirstMenu.menuKey) || 0;
//       }
//     }
//     // console.log("tabsData -> ", tabsData);
//     // 计算 pageHeaderBreadcrumb forceHideAntPageHeader
//     const pageHeaderBreadcrumb: AntdBreadcrumbProps = {};
//     let antPageHeaderBreadcrumb: string | undefined;
//     let forceHideAntPageHeader: boolean = false;
//     if (pageContentPageHeaderModel === PageHeaderModel.AntPageHeader) {
//       // 计算 pageHeaderBreadcrumb
//       pageHeaderBreadcrumb.routes = getBreadcrumbRoutes(layoutMenuData);
//       if (breadcrumbRoutesInterceptor instanceof Function) pageHeaderBreadcrumb.routes = breadcrumbRoutesInterceptor(layoutMenuData, pageHeaderBreadcrumb.routes);
//       pageHeaderBreadcrumb.itemRender = (route, params, routes, paths) => breadcrumbItemRender(route, params, routes, paths, location);
//       antPageHeaderBreadcrumb = styles.antPageHeaderBreadcrumb;
//       // 计算 forceHideAntPageHeader
//       const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//       forceHideAntPageHeader = !currentFirstMenu || !currentFirstMenu.children || currentFirstMenu.children.length <= 0;
//     }
//     // console.log('getPageContent 读取multiTabScrollLeft ', multiTabScrollLeft, multiTabScrollLeftMap);
//     // 扩展 scrollbarClassName?
//     return (
//       <PageContent
//         menuIconScriptUrl={menuIconScriptUrl}
//         pageHeaderModel={pageContentPageHeaderModel}
//         enablePageHeader={pageContentEnablePageHeader}
//         forceHideMultiTab={pageContentForceHideMultiTab || forceHideMultiTab}
//         defaultHasScroll={defaultHasScroll}
//         hasScrollOnChange={(hasScroll) => {
//           const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//           if (currentFirstMenu) {
//             const oldHasScroll = multiTabNavHasScrollMap.get(currentFirstMenu.menuKey);
//             multiTabNavHasScrollMap.set(currentFirstMenu.menuKey, hasScroll);
//             if (oldHasScroll !== hasScroll) this.forceUpdate();
//           }
//         }}
//         multiTabScrollLeft={multiTabScrollLeft}
//         multiTabScrollLeftOnChange={(scrollLeft) => {
//           const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//           if (currentFirstMenu) {
//             multiTabScrollLeftMap.set(currentFirstMenu.menuKey, scrollLeft);
//           }
//         }}
//         tabsData={pageContentTabsData! || tabsData}
//         showHomeButton={pageContentShowHomeButton}
//         showMoreButton={pageContentShowMoreButton}
//         onClickHomeButton={() => {
//           if (pageContentOnClickHomeButton instanceof Function) pageContentOnClickHomeButton();
//           this.pageContentOnClickHomeButton();
//         }}
//         onClickMoreButton={(param, eventKey) => {
//           if (pageContentOnClickMoreButton instanceof Function) pageContentOnClickMoreButton(param, eventKey);
//           this.pageContentOnClickMoreButton(param, eventKey);
//         }}
//         onCloseTab={(multiTab) => {
//           if (pageContentOnCloseTab instanceof Function) pageContentOnCloseTab(multiTab);
//           this.pageContentOnCloseTab(multiTab);
//         }}
//         onClickTab={(multiTab) => {
//           if (pageContentOnClickTab instanceof Function) pageContentOnClickTab(multiTab);
//           this.pageContentOnClickTab(multiTab);
//         }}
//         multiTabNavClassName={pageContentMultiTabNavClassName}
//         multiTabNavStyle={pageContentMultiTabNavStyle}
//         leftClassName={pageContentLeftClassName}
//         leftStyle={pageContentLeftStyle}
//         centreClassName={pageContentCentreClassName}
//         centreStyle={pageContentCentreStyle}
//         rightClassName={pageContentRightClassName}
//         rightStyle={pageContentRightStyle}
//         tabClassName={pageContentTabClassName}
//         tabStyle={pageContentTabStyle}
//         tabActiveClassName={pageContentTabActiveClassName}
//         tabTitleClassName={pageContentTabTitleClassName}
//         tabTitleStyle={pageContentTabTitleStyle}
//         tabCloseClassName={pageContentTabCloseClassName}
//         tabCloseStyle={pageContentTabCloseStyle}
//         leftRender={pageContentLeftRender}
//         rightRender={pageContentRightRender}
//         tabRender={pageContentTabRender}
//         activeTabRender={pageContentActiveTabRender}
//         forceHideAntPageHeader={pageContentForceHideAntPageHeader || forceHideAntPageHeader}
//         onBack={pageContentOnBack}
//         pageHeaderTitle={pageContentPageHeaderTitle}
//         pageHeaderSubTitle={pageContentPageHeaderSubTitle}
//         pageHeaderTags={pageContentPageHeaderTags}
//         pageHeaderBreadcrumb={{ ...pageHeaderBreadcrumb, ...pageContentPageHeaderBreadcrumb }}
//         pageHeaderContent={pageContentPageHeaderContent}
//         pageHeaderExtra={pageContentPageHeaderExtra}
//         pageHeaderFooter={pageContentPageHeaderFooter}
//         pageHeaderProps={pageContentPageHeaderProps}
//         pageHeaderClassName={classNames(antPageHeaderBreadcrumb, pageContentPageHeaderClassName)}
//         pageHeaderStyle={pageContentPageHeaderStyle}
//         beautifyScrollbar={pageContentBeautifyScrollbar}
//         autoHideScrollbar={pageContentAutoHideScrollbar}
//         scrollbarClassName={pageContentScrollbarClassName}
//         contentClassName={pageContentContentClassName}
//         contentStyle={pageContentContentStyle}
//       >
//         {children}
//       </PageContent>
//     );
//   }
//
//   /** 全局页脚 */
//   protected getGlobalFooter() {
//     const { globalFooterLinks, globalFooterCopyright, globalFooterStyle = {}, globalFooterClassName, globalFooterRender } = this.props;
//     return (
//       <GlobalFooter links={globalFooterLinks} copyright={globalFooterCopyright} style={globalFooterStyle} className={globalFooterClassName} footerRender={globalFooterRender} />
//     );
//   }
//
//   /** 点击跳转到首页事件 */
//   protected pageContentOnClickHomeButton(): void {
//     // console.log("pageContentOnClickHomeButton -> ");
//     const { layoutMenuData, multiTabsDataMap } = this;
//     const { location } = this.props;
//     const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//     if (!currentFirstMenu || !layoutMenuData.currentMenu) return;
//     const tabsData: MultiTabItem[] | undefined = multiTabsDataMap.get(currentFirstMenu.menuKey);
//     if (!tabsData) return;
//     const homeTab = tabsData.find((tabTmp) => tabTmp.isHomePage);
//     if (!homeTab) return;
//     pageJumpForLocation({ currentLocation: location, newLocation: homeTab.location });
//   }
//
//   /** 多标签页更多菜单点击事件 */
//   protected pageContentOnClickMoreButton(param: AntdMenuClickParam, eventKey: MoreButtonEventKey): void {
//     // console.log("pageContentOnClickMoreButton -> ", param, eventKey);
//     const { layoutMenuData, multiTabsDataMap } = this;
//     const { location } = this.props;
//     const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//     if (!currentFirstMenu || !layoutMenuData.currentMenu) return;
//     const tabsData: MultiTabItem[] | undefined = multiTabsDataMap.get(currentFirstMenu.menuKey);
//     if (!tabsData) return;
//     const activeIndex = tabsData.findIndex((tabTmp) => tabTmp.active);
//     const activeTab = tabsData.find((tabTmp) => tabTmp.active);
//     const homeIndex = tabsData.findIndex((tabTmp) => tabTmp.isHomePage);
//     const homeTab = tabsData.find((tabTmp) => tabTmp.isHomePage);
//     let newMultiTabData: MultiTabItem[] = [];
//     switch (eventKey) {
//       case 'closeLeft':
//         newMultiTabData = tabsData.slice(activeIndex);
//         break;
//       case 'closeRight':
//         newMultiTabData = tabsData.slice(0, activeIndex + 1);
//         break;
//       case 'closeOther':
//         if (homeTab) newMultiTabData.push(homeTab);
//         if (activeTab && (!homeTab || homeTab.multiTabKey !== activeTab.multiTabKey)) {
//           if (activeIndex > homeIndex) {
//             newMultiTabData.push(activeTab);
//           } else {
//             newMultiTabData.unshift(activeTab);
//           }
//         }
//         break;
//       case 'closeAll':
//         if (homeTab) {
//           homeTab.active = true;
//           newMultiTabData.push(homeTab);
//         }
//         break;
//       default:
//     }
//     // 加入home
//     if (homeTab && newMultiTabData.findIndex((tabTmp) => tabTmp.isHomePage) <= -1) {
//       if (activeIndex > homeIndex) {
//         newMultiTabData.unshift(homeTab);
//       } else {
//         newMultiTabData.push(homeTab);
//       }
//     }
//     // 确定有选中的
//     if (activeTab && newMultiTabData.findIndex((tabTmp) => tabTmp.active) <= -1) {
//       if (activeIndex <= homeIndex) {
//         newMultiTabData.unshift(activeTab);
//       } else {
//         newMultiTabData.push(activeTab);
//       }
//     }
//     // 页签数量没有变化-不用更新页面
//     if (tabsData.length === newMultiTabData.length) return;
//     // 重置 tabsData
//     tabsData.length = 0;
//     tabsData.push(...newMultiTabData);
//     const pushMultiTab = tabsData.find((tabTmp) => tabTmp.active);
//     if (!pushMultiTab) {
//       this.forceUpdate();
//       return;
//     }
//     const flag = pageJumpForLocation({ currentLocation: location, newLocation: pushMultiTab.location });
//     if (!flag) this.forceUpdate();
//   }
//
//   /** 关闭多标签页Tab事件 */
//   protected pageContentOnCloseTab(multiTab: MultiTabItem): void {
//     // console.log("pageContentOnCloseTab -> ", multiTab);
//     const { layoutMenuData, multiTabsDataMap } = this;
//     const { location } = this.props;
//     const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//     if (!currentFirstMenu || !layoutMenuData.currentMenu) return;
//     const tabsData: MultiTabItem[] | undefined = multiTabsDataMap.get(currentFirstMenu.menuKey);
//     if (!tabsData) return;
//     const delIndex = tabsData.findIndex((tabTmp) => tabTmp.multiTabKey === multiTab.multiTabKey);
//     if (delIndex <= -1) return;
//     if (tabsData.length <= 1) {
//       message.warning('至少保留一个标签页!');
//       return;
//     }
//     tabsData.splice(delIndex, 1);
//     if (tabsData.length <= 0) return;
//     const array = lodash.sortBy(tabsData, (tabTmp) => {
//       if (!tabTmp || !tabTmp.lastActiveTime) return 0;
//       return tabTmp.lastActiveTime;
//     });
//     const pushMultiTab = array[array.length - 1];
//     const flag = pageJumpForLocation({ currentLocation: location, newLocation: pushMultiTab.location });
//     if (!flag) this.forceUpdate();
//   }
//
//   /** 点击多标签页Tab事件 */
//   protected pageContentOnClickTab(multiTab: MultiTabItem): void {
//     // console.log("pageContentOnClickTab -> ", multiTab);
//     const { location } = this.props;
//     pageJumpForLocation({ currentLocation: location, newLocation: multiTab.location });
//   }
//
//   /** 增加当前页面到多标签页 */
//   protected addCurrentActiveTab(): MultiTabItem[] {
//     const { layoutMenuData, multiTabsDataMap } = this;
//     const { location } = this.props;
//     const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//     if (!currentFirstMenu || !layoutMenuData.currentMenu) return [];
//     let tabsData: MultiTabItem[] | undefined = multiTabsDataMap.get(currentFirstMenu.menuKey);
//     if (!tabsData) {
//       tabsData = [];
//       multiTabsDataMap.set(currentFirstMenu.menuKey, tabsData);
//       const homeTab = getHomeMultiTabItem(currentFirstMenu);
//       if (homeTab) tabsData.push(homeTab);
//     }
//     tabsData.forEach((tabTmp) => {
//       tabTmp.active = false;
//     });
//     const newTab = newMultiTabItem(layoutMenuData.currentMenu, location, layoutMenuData.currentPath);
//     const oldTab = tabsData.find((tabTmp) => tabTmp.multiTabKey === newTab.multiTabKey);
//     // console.log("oldTab -> ", oldTab);
//     if (oldTab) {
//       oldTab.active = true;
//       oldTab.lastActiveTime = new Date().getTime();
//       return tabsData;
//     }
//     newTab.active = true;
//     tabsData.push(newTab);
//     return tabsData;
//   }
//
//   /** 一级菜单选中事件 */
//   protected firstMenuOnSelect(param: HeaderFirstMenuSelectParam): void {
//     let routerMenu: RuntimeMenuItem | undefined;
//     // 获取当前一级菜单下的二级菜单的 selectedKeys 对应的 RuntimeMenuItem
//     const { layoutMenuData, sideMenuSelectedKeysMap } = this;
//     let routerMenuKey: string | undefined;
//     let location: UmiLocation | undefined;
//     if (param.menuData.menuKey) {
//       const valueTmp = sideMenuSelectedKeysMap.get(param.menuData.menuKey);
//       if (valueTmp) {
//         routerMenuKey = valueTmp.menuKey;
//         location = valueTmp.location;
//       }
//     }
//     if (routerMenuKey) {
//       routerMenu = getMenuItemByKey(layoutMenuData.flattenMenuMap, routerMenuKey);
//     }
//     // 获取默认的第一个 RouterMenuItem
//     if (!routerMenu) {
//       routerMenu = getFirstShowMenu(param.menuData) || getFirstMenu(param.menuData);
//     }
//     // console.log("headerMenuOnMenuSelect ", routerMenu, location);
//     if (location) {
//       pageJumpForLocation({ currentLocation: this.props.location, newLocation: location });
//     } else {
//       pageJumpForRouter({ currentLocation: this.props.location, router: routerMenu.routerConfig });
//     }
//   }
//
//   /** 二级菜单展开/折叠事件 */
//   protected sideMenuOnMenuOpenChange(param: SideSecondMenuOpenChangeParam): void {
//     // console.log("sideMenuOnMenuOpenChange ", param.openKeys);
//     const { layoutMenuData } = this;
//     const { menuCollapsed, sideMenuOpenKeysMap } = this.state;
//     if (menuCollapsed) return;
//     const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//     if (!currentFirstMenu) return;
//     this.setState({ sideMenuOpenKeysMap: sideMenuOpenKeysMap.set(currentFirstMenu.menuKey, param.openKeys) });
//   }
//
//   /** 二级菜单点击跳转页面事件 */
//   protected sideMenuOnMenuClick(param: SideSecondMenuClickParam): void {
//     // console.log("sideMenuOnMenuClick ", param);
//     const { layoutMenuData, sideMenuSelectedKeysMap } = this;
//     const { location } = this.props;
//     const { menuData: routerMenu } = param;
//     const currentFirstMenuKey = getCurrentFirstMenuKey(layoutMenuData);
//     pageJumpForRouter({ currentLocation: location, router: routerMenu.routerConfig }, () => {
//       if (currentFirstMenuKey) {
//         sideMenuSelectedKeysMap.set(currentFirstMenuKey, { menuKey: routerMenu.menuKey, location });
//       }
//     });
//   }
//
//   /** 二级菜单过滤关键字改变事件 */
//   protected sideMenuOnSearchValueChange(value: string, event: React.ChangeEvent<HTMLInputElement>): void {
//     // console.log("sideMenuOnSearchValueChange ", value, event);
//     const { layoutMenuData } = this;
//     const { sideMenuSearchValueMap } = this.state;
//     const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//     if (!currentFirstMenu) return;
//     this.setState({ sideMenuSearchValueMap: sideMenuSearchValueMap.set(currentFirstMenu.menuKey, value) });
//   }
//
//   /** 二级菜单过滤事件 */
//   protected sideMenuOnSearchMenu(value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>): void {
//     // console.log("sideMenuOnSearchMenu ", value, event);
//     const { layoutMenuData } = this;
//     const { sideMenuSearchValueMap } = this.state;
//     const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
//     if (!currentFirstMenu) return;
//     this.setState({ sideMenuSearchValueMap: sideMenuSearchValueMap.set(currentFirstMenu.menuKey, value) });
//   }
//
//   /** 获取菜单数据 */
//   public getLayoutMenuData(props: P): LayoutMenuData {
//     const { enableLocale, defaultOpen, formatMessage, location, route, layoutMenuDataInterceptor } = props;
//     const configContext: GlobalConfigContext = { menuSettings: { enableLocale, defaultOpen }, formatMessage };
//     let layoutMenuData = getLayoutMenuData(configContext, location, route);
//     if (layoutMenuDataInterceptor instanceof Function) {
//       layoutMenuData = layoutMenuDataInterceptor(configContext, location, route, layoutMenuData);
//     }
//     return layoutMenuData;
//   }
//
//   /** 是否存在页脚(Footer容器) */
//   public existsFooter() {
//     const { globalFooterLinks, globalFooterCopyright } = this.props;
//     return (globalFooterLinks && Array.isArray(globalFooterLinks) && globalFooterLinks.length > 0) || globalFooterCopyright;
//   }
//
//   /** 获取菜单折叠状态(true:已折叠) */
//   public getMenuCollapsed(): boolean {
//     return getPropOrStateValue('menuCollapsed', this.props, this.state);
//   }
// }
//
// export { BaseLayoutProps, BaseLayoutState, DefaultSideMenuBottomRender, DefaultSideMenuTopRender, BaseLayout };
