import React, { CSSProperties } from 'react';
import Immutable from 'immutable';
import classNames from "classnames";
import { Helmet } from 'react-helmet';
import { CloseOutlined } from '@ant-design/icons';
import Tabs, { TabPane } from 'rc-tabs';
import SimpleBarReact from 'simplebar-react';
import { getPropOrStateValue } from "@/utils/utils";
import { loadPageByPath } from "@/utils/amis-utils";
import { PageContent } from "@/components/Layout/PageContent";
import { GlobalFooter, GlobalFooterLink, GlobalFooterProps } from "@/components/Layout/GlobalFooter";
import { GlobalHeader, GlobalHeaderProps } from "@/components/Layout/GlobalHeader";
import { getCurrentFirstMenu, getDefaultOpenKeys, getHtmlTitle, getSideMenuData } from "@/components/Layout/utils/layouts-utils";
import { SideMenu, SideMenuProps, SideSecondMenuClickParam, SideSecondMenuOpenChangeParam, SideSecondMenuSelectParam } from "@/components/Layout/SideMenu";
import { AntdInputSearchProps, AntdMenuProps, AntdMenuTheme } from "@/components/Layout/layout-types";
import styles from './index.less';

type DefaultSideMenuBottomRender = (
  props: Omit<SideMenuProps, 'topRender'>,
  className: string,
  elementMap: Map<String, React.ReactNode>,
  currentFirstMenu: RuntimeMenuItem,
) => React.ReactNode;

/** 二级菜单自定义侧边栏顶部部区域默认渲染逻辑 */
type DefaultSideMenuTopRender = (
  props: Omit<SideMenuProps, 'topRender'>,
  className: string,
  elementMap: Map<String, React.ReactNode>,
  currentFirstMenu: RuntimeMenuItem,
) => React.ReactNode;


interface BaseLayoutProps extends LayoutPageComponentProps {
  // ----------------------------------------------------------------------------------- 基础配置
  /** 当前Layout菜单数据 */
  layoutMenuData: LayoutMenuData;
  /** Header高度(建议 32 ~ 64) */
  headerHeight: number;
  /** 侧边栏宽度(二级菜单宽度，建议 160 ~ 256) */
  sideMenuWidth: number;
  /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  menuIconScriptUrl?: string;
  /** html页面title后缀 */
  htmlTitleSuffix?: string;
  /** 页面加载状态 */
  loading?: boolean;
  /** 是否隐藏全局页头 */
  hideGlobalHeader?: boolean;
  /** 是否隐藏全局页脚 */
  hideGlobalFooter?: boolean;
  /** 菜单-默认展开子菜单 */
  defaultOpen?: boolean;
  /** 自定义 LayoutMenuData 数据处理 */
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
  // ----------------------------------------------------------------------------------- SideMenu 配置
  /** 是否启用过滤菜单功能 */
  sideMenuEnableSearchMenu?: boolean;
  /** 默认的过滤菜单关键字 */
  sideMenuSearchDefaultValue?: string;
  /** 过滤菜单关键字 */
  sideMenuSearchValue?: string;
  /** 触发搜索菜单事件 */
  sideMenuOnSearchMenu?: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
  /** 过滤菜单关键字改变事件 */
  sideMenuOnSearchValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 自定义搜索输入框class样式 */
  sideMenuSearchClassName?: string;
  /** 自定义搜索输入框样式 */
  sideMenuSearchStyle?: CSSProperties;
  /** 自定义搜索输入框属性 */
  sideMenuSearchProps?: AntdInputSearchProps;
  /** 侧边栏菜单主题 */
  sideMenuTheme?: AntdMenuTheme;
  /** 初始选中的菜单项 key 数组 */
  sideMenuDefaultSelectedKeys?: string[];
  /** 当前选中的菜单项 key 数组 */
  sideMenuSelectedKeys?: string[];
  /** 初始展开的 SubMenu 菜单项 key 数组 */
  sideMenuDefaultOpenKeys?: string[];
  /** 当前展开的 SubMenu 菜单项 key 数组 */
  sideMenuOpenKeys?: string[];
  /** 自定义渲染菜单项 */
  sideMenuMenuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  /** 自定义渲染目录菜单 */
  sideMenuMenuFolderRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  /** 自定义渲染分组菜单 */
  sideMenuMenuItemGroupRender?: (menuGroup: RuntimeMenuItem[], groupName: string) => React.ReactNode;
  /** 菜单被选中的事件(用于处理菜单跳转) */
  sideMenuOnMenuSelect?: (param: SideSecondMenuSelectParam) => void;
  /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
  sideMenuOnMenuClick?: (param: SideSecondMenuClickParam) => void;
  /** 菜单SubMenu展开/关闭的事件(用于保存菜单展开状态) */
  sideMenuOnMenuOpenChange?: (param: SideSecondMenuOpenChangeParam) => void;
  /** 点击子菜单(SubMenu)标题的事件 */
  sideMenuOnSubMenuTitleClick?: () => void;
  /** 自定义菜单class样式 */
  sideMenuMenuClassName?: string;
  /** 自定义菜单样式 */
  sideMenuMenuStyle?: CSSProperties;
  /** 自定义菜单项class样式 */
  sideMenuMenuItemClassName?: string;
  /** 自定义菜单项样式 */
  sideMenuMenuItemStyle?: CSSProperties;
  /** 自定义antd Menu 组件属性 */
  sideMenuMenuProps?: AntdMenuProps;
  /** 上部区域class样式 */
  sideMenuTopClassName?: string;
  /** 上部区域样式 */
  sideMenuTopStyle?: CSSProperties;
  /** 中间菜单区域class样式 */
  sideMenuCentreClassName?: string;
  /** 中间菜单区域样式 */
  sideMenuCentreStyle?: CSSProperties;
  /** 底部区域class样式 */
  sideMenuBottomClassName?: string;
  /** 底部区域样式 */
  sideMenuBottomStyle?: CSSProperties;
  /** 自定义顶部区域渲染逻辑 */
  sideMenuTopRender?: (props: Omit<SideMenuProps, 'topRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  sideMenuCentreRender?: (props: Omit<SideMenuProps, 'centreRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义底部区域渲染逻辑 */
  sideMenuBottomRender?: (props: Omit<SideMenuProps, 'bottomRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义渲染逻辑 */
  sideMenuRender?: (props: Omit<SideMenuProps, 'sideMenuRender'>) => React.ReactNode;
  /** 是否美化滚动条 */
  sideMenuBeautifyScrollbar?: boolean;
  /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  sideMenuAutoHideScrollbar?: boolean;
  /** 自定义美化滚动条class样式 */
  sideMenuScrollbarClassName?: string;
}

interface BaseLayoutState {
  /** 菜单折叠状态(true:已折叠) */
  menuCollapsed: boolean;
  /**
   * 二级菜单选中的key
   * <pre>
   *   Map<一级菜单key, { menuKey: string, location: UmiLocation }>
   * </pre>
   */
  sideMenuSelectedKeysMap: Map<string, { menuKey: string; location: RouterLocation }>;
  /**
   * 二级菜单展开状态
   * <pre>
   *   Map<一级菜单key, string[]>
   * </pre>
   */
  sideMenuOpenKeysMap: Immutable.Map<string, string[]>;
  /**
   * 二级菜单过滤关键字
   * <pre>
   *   Map<一级菜单key, 过滤值>
   * </pre>
   */
  sideMenuSearchValueMap: Immutable.Map<string, string>;
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
      globalHeaderLeftClassName, globalHeaderLeftStyle, globalHeaderCentreClassName, globalHeaderCentreStyle, globalHeaderRightClassName,
      globalHeaderRightStyle, globalHeaderLeftRender, globalHeaderCentreRender, globalHeaderRightRender, globalHeaderRender,
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
    const {globalFooterLinks, globalFooterCopyright, globalFooterStyle = {}, globalFooterClassName, globalFooterRender} = this.props;
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

  /** 侧边栏菜单(二级菜单) */
  protected getSideMenu(defaultSideMenuBottomRender?: DefaultSideMenuBottomRender, defaultSideMenuTopRender?: DefaultSideMenuTopRender) {
    const {sideMenuSelectedKeysMap, sideMenuOpenKeysMap, sideMenuSearchValueMap} = this.state;
    const {location, defaultOpen, layoutMenuData, sideMenuOnSearchMenu, sideMenuOnSearchValueChange, sideMenuOnMenuClick, sideMenuOnMenuOpenChange} = this.props;
    const menuCollapsed = this.getMenuCollapsed();
    // 计算 searchDefaultValue searchValue currentPath menuData defaultSelectedKeys selectedKeys defaultOpenKeys openKeys
    // 事件 onSearchMenu onSearchValueChange onMenuClick onMenuOpenChange
    // 扩展 menuTheme? bottomRender scrollbarClassName?
    if (!layoutMenuData.currentMenu) return undefined;
    // if (!layoutMenuData.showCurrentMenu) return undefined;
    const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
    if (!currentFirstMenu) return undefined;
    const searchValue = sideMenuSearchValueMap.get(currentFirstMenu.menuKey) || '';
    const currentPath = layoutMenuData.currentPath;
    const menuData = currentFirstMenu;
    // 选中的菜单
    const defaultSelectedKeys: string[] = [layoutMenuData.currentMenu.menuKey]; // showCurrentMenu
    const selectedKeys: string[] = [layoutMenuData.currentMenu.menuKey]; // showCurrentMenu
    // 保存当前二级菜单
    sideMenuSelectedKeysMap.set(currentFirstMenu.menuKey, {menuKey: layoutMenuData.currentMenu.menuKey, location});
    // 展开的菜单
    let defaultOpenKeys: string[] | undefined;
    let openKeys: string[] | undefined;
    if (!menuCollapsed) {
      defaultOpenKeys = getDefaultOpenKeys(defaultOpen ?? false, currentFirstMenu, layoutMenuData.currentMenu);
      openKeys = sideMenuOpenKeysMap.get(currentFirstMenu.menuKey) || defaultOpenKeys;
    }
    let {sideMenuTopRender, sideMenuBottomRender} = this.props;
    if (!sideMenuBottomRender && defaultSideMenuBottomRender instanceof Function) {
      sideMenuBottomRender = (props, className, elementMap) => defaultSideMenuBottomRender!(props, className, elementMap, currentFirstMenu);
    }
    if (!sideMenuTopRender && defaultSideMenuTopRender instanceof Function) {
      sideMenuTopRender = (props, className, elementMap) => defaultSideMenuTopRender!(props, className, elementMap, currentFirstMenu);
    }
    // console.log("[getSideMenu] currentShowMenu -> ", layoutMenuData.currentShowMenu);
    // console.log("[getSideMenu] searchValue -> ", searchValue, sideMenuSelectedKeysMap);
    return (
      <SideMenu
        menuCollapsed={menuCollapsed}
        sideMenuWidth={this.props.sideMenuWidth}
        enableSearchMenu={this.props.sideMenuEnableSearchMenu}
        searchDefaultValue={this.props.sideMenuSearchDefaultValue}
        searchValue={this.props.sideMenuSearchValue || searchValue}
        onSearchMenu={(value, event) => {
          if (sideMenuOnSearchMenu instanceof Function) sideMenuOnSearchMenu(value, event);
          // this.sideMenuOnSearchMenu(value, event);
        }}
        onSearchValueChange={(value, event) => {
          if (sideMenuOnSearchValueChange instanceof Function) sideMenuOnSearchValueChange(value, event);
          // this.sideMenuOnSearchValueChange(value, event);
        }}
        searchClassName={this.props.sideMenuSearchClassName}
        searchStyle={this.props.sideMenuSearchStyle}
        searchProps={this.props.sideMenuSearchProps}
        currentPath={currentPath}
        menuData={getSideMenuData(menuData, searchValue)}
        menuIconScriptUrl={this.props.menuIconScriptUrl}
        menuTheme={this.props.sideMenuTheme}
        defaultSelectedKeys={this.props.sideMenuDefaultSelectedKeys || defaultSelectedKeys}
        selectedKeys={this.props.sideMenuSelectedKeys || selectedKeys}
        defaultOpenKeys={this.props.sideMenuDefaultOpenKeys || defaultOpenKeys}
        openKeys={this.props.sideMenuOpenKeys || openKeys}
        menuItemRender={this.props.sideMenuMenuItemRender}
        menuFolderRender={this.props.sideMenuMenuFolderRender}
        menuItemGroupRender={this.props.sideMenuMenuItemGroupRender}
        onMenuSelect={this.props.sideMenuOnMenuSelect}
        onMenuClick={(param) => {
          if (sideMenuOnMenuClick instanceof Function) sideMenuOnMenuClick(param);
          // this.sideMenuOnMenuClick(param);
          this.addTabPage("1", "/amis/form-03-dialog-schema.ts");
          // this.addTabPage("1", "/amis/00-tmp-schema.ts");
        }}
        onMenuOpenChange={(param) => {
          if (sideMenuOnMenuOpenChange instanceof Function) sideMenuOnMenuOpenChange(param);
          // this.sideMenuOnMenuOpenChange(param);
        }}
        onSubMenuTitleClick={this.props.sideMenuOnSubMenuTitleClick}
        menuClassName={this.props.sideMenuMenuClassName}
        menuStyle={this.props.sideMenuMenuStyle}
        menuItemClassName={this.props.sideMenuMenuItemClassName}
        menuItemStyle={this.props.sideMenuMenuItemStyle}
        menuProps={this.props.sideMenuMenuProps}
        topClassName={this.props.sideMenuTopClassName}
        topStyle={this.props.sideMenuTopStyle}
        centreClassName={this.props.sideMenuCentreClassName}
        centreStyle={this.props.sideMenuCentreStyle}
        bottomClassName={this.props.sideMenuBottomClassName}
        bottomStyle={this.props.sideMenuBottomStyle}
        topRender={sideMenuTopRender}
        centreRender={this.props.sideMenuCentreRender}
        bottomRender={sideMenuBottomRender}
        sideMenuRender={this.props.sideMenuRender}
        beautifyScrollbar={this.props.sideMenuBeautifyScrollbar}
        autoHideScrollbar={this.props.sideMenuAutoHideScrollbar}
        scrollbarClassName={this.props.sideMenuScrollbarClassName}
      />
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

  // -----------------------------------------------------------------------------------

  /** 是否存在页脚(Footer容器) */
  public existsFooter(): boolean {
    const {globalFooterLinks, globalFooterCopyright} = this.props;
    return (globalFooterLinks && Array.isArray(globalFooterLinks) && globalFooterLinks.length > 0) || !!globalFooterCopyright;
  }

  /** 获取菜单折叠状态(true:已折叠) */
  public getMenuCollapsed(): boolean {
    return getPropOrStateValue('menuCollapsed', this.props, this.state);
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

export { DefaultSideMenuBottomRender, DefaultSideMenuTopRender, BaseLayoutProps, BaseLayoutState, BaseLayout };
