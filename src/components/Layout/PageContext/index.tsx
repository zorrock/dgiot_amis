import React from 'react';
// import { AntdBreadcrumbProps, AntdMenuClickParam, AntdPageHeaderProps, AntdTagType } from '../layout-types';
// import { MoreButtonEventKey, MultiTabNavProps } from '../PageWrapper/MultiTabNav';

/** PageHeader模式(是否多标签页) */
enum PageHeaderModel {
  /** 使用antd原生PageHeader页头 */
  AntPageHeader = 'AntPageHeader',
  /** 使用多标签页 */
  MultiTab = 'MultiTab',
}

/** 全局参数 */
interface PageContextProps {
  // // ----------------------------------------------------------------------------------- 主配置
  // /** 自定义菜单图标字体(方便在页面里面使用) - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  // menuIconScriptUrl?: string;
  // /** PageHeader模式 */
  // pageHeaderModel?: PageHeaderModel;
  // /** pageHeaderModel="MultiTab"时，是否启用 PageHeader 组件 */
  // enablePageHeader?: boolean;
  // // ----------------------------------------------------------------------------------- MultiTab 配置
  // /** 是否强制隐藏MultiTab */
  // forceHideMultiTab?: boolean;
  // /** 默认是否存在滚动条 */
  // defaultHasScroll?: boolean;
  // /** 是否存在滚动条状态变化事件 */
  // hasScrollOnChange?: (hasScroll: boolean) => void;
  // /** 多页签容器scrollLeft值 */
  // multiTabScrollLeft?: number;
  // /** 多页签容器scrollLeft值变化事件 */
  // multiTabScrollLeftOnChange?: (scrollLeft: number) => void;
  // /** 页签数据 */
  // tabsData: MultiTabItem[];
  // /** 是否显示跳回首页按钮 */
  // showHomeButton?: boolean;
  // /** 是否显示更多按钮按钮 */
  // showMoreButton?: boolean;
  // /** 点击跳回首页按钮事件 */
  // onClickHomeButton?: () => void;
  // /** 点击更多按钮项事件 */
  // onClickMoreButton?: (param: AntdMenuClickParam, eventKey: MoreButtonEventKey) => void;
  // /** 点击RouterTabItem上的关闭按钮事件 */
  // onCloseTab?: (multiTab: MultiTabItem) => void;
  // /** 单击RouterTabItem上的标题事件 */
  // onClickTab?: (multiTab: MultiTabItem) => void;
  // /** MultiTabNav class样式 */
  // multiTabNavClassName?: string;
  // /** MultiTabNav样式 */
  // multiTabNavStyle?: CSSProperties;
  // /** 左侧区域class样式 */
  // leftClassName?: string;
  // /** 左侧区域样式 */
  // leftStyle?: CSSProperties;
  // /** 中间动态宽度区域class样式 */
  // centreClassName?: string;
  // /** 中间动态宽度区域样式 */
  // centreStyle?: CSSProperties;
  // /** 左侧区域class样式 */
  // rightClassName?: string;
  // /** 左侧区域样式 */
  // rightStyle?: CSSProperties;
  // /** 多页签Tab class样式 */
  // tabClassName?: string;
  // /** 多页签Tab样式 */
  // tabStyle?: CSSProperties;
  // /** 多页签active Tab class样式 */
  // tabActiveClassName?: string;
  // /** Tab标题class样式 */
  // tabTitleClassName?: string;
  // /** Tab标题样式 */
  // tabTitleStyle?: CSSProperties;
  // /** Tab关闭按钮class样式 */
  // tabCloseClassName?: string;
  // /** Tab关闭按钮样式 */
  // tabCloseStyle?: CSSProperties;
  // /** 自定义左侧区域渲染逻辑 */
  // leftRender?: (props: Omit<MultiTabNavProps, 'leftRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义右侧区域渲染逻辑 */
  // rightRender?: (props: Omit<MultiTabNavProps, 'rightRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  // /** 自定义多页签渲染 */
  // tabRender?: (props: Omit<MultiTabNavProps, 'tabRender'>, tabItem: MultiTabItem, elementMap: Map<String, React.ReactNode>) => Map<String, React.ReactNode>;
  // /** 自定义当前选中页签渲染 */
  // activeTabRender?: (props: Omit<MultiTabNavProps, 'activeTabRender'>, tabItem: MultiTabItem, elementMap: Map<String, React.ReactNode>) => Map<String, React.ReactNode>;
  // // ----------------------------------------------------------------------------------- AntPageHeader 配置
  // /** 是否强制隐藏 AntPageHeader */
  // forceHideAntPageHeader?: boolean;
  // /** 返回上一页 */
  // onBack?: boolean | (() => void) | string | UmiLocation;
  // /** 页面标题 */
  // pageHeaderTitle?: React.ReactNode;
  // /** 页面描述 */
  // pageHeaderSubTitle?: React.ReactNode;
  // /** title 旁的 tag 列表 */
  // pageHeaderTags?: React.ReactElement<AntdTagType> | React.ReactElement<AntdTagType>[];
  // /** 面包屑配置 */
  // pageHeaderBreadcrumb?: AntdBreadcrumbProps;
  // /** PageHeader内容 */
  // pageHeaderContent?: React.ReactNode;
  // /** 操作区，位于 title 行的行尾 */
  // pageHeaderExtra?: React.ReactNode;
  // /** PageHeader 的页脚，一般用于渲染 TabBar */
  // pageHeaderFooter?: React.ReactNode;
  // /** PageHeader扩展属性 */
  // pageHeaderProps?: AntdPageHeaderProps;
  // /** Ant PageHeader组件class样式 */
  // pageHeaderClassName?: string;
  // /** Ant PageHeader组件样式 */
  // pageHeaderStyle?: CSSProperties;
  // // ----------------------------------------------------------------------------------- PageContent 配置
  // /** 是否美化滚动条 */
  // beautifyScrollbar?: boolean;
  // /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  // autoHideScrollbar?: boolean;
  // /** 自定义美化滚动条class样式 */
  // scrollbarClassName?: string;
  // // ----------------------------------------------------------------------------------- 扩展配置
  // /** 页面class样式 */
  // contentClassName?: string;
  // /** 页面样式 */
  // contentStyle?: CSSProperties;
}

const PageContext: React.Context<PageContextProps> = React.createContext<PageContextProps>({
  // tabsData: [],
});

export { PageHeaderModel, PageContextProps, PageContext };
