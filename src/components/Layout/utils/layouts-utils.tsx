import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { Menu } from 'antd';
import AntdIcon, { AntdIconFont, createIconFontCN } from '@/components/AntdIcon';
import styles from '../GlobalSide/SideFirstMenu.less';

/**
 * 获取页面标题
 * @param route           当前路由信息
 * @param htmlTitleSuffix html页面title后缀
 */
const getHtmlTitle = (route: RuntimeRouter, htmlTitleSuffix?: string): string => {
  let title = 'Amis Admin';
  const {pageTitle} = route;
  if (pageTitle) {
    if (pageTitle && htmlTitleSuffix) {
      title = `${pageTitle} - ${htmlTitleSuffix ?? ''}`;
    } else {
      title = `${pageTitle ?? ''}${htmlTitleSuffix ?? ''}`;
    }
  } else if (htmlTitleSuffix) {
    title = htmlTitleSuffix;
  }
  return title;
};

/**
 * 自定义菜单渲染(渲染叶子菜单)
 * @param menu  菜单数据
 * @param icon  菜单图标
 */
const defaultCustomMenuItemRender = (menu: RuntimeMenuItem, icon?: React.ReactNode): React.ReactNode => {
  return (
    <>
      {icon}
      <span className={classNames(styles.customMenuItemTitle)}>{menu.runtimeRouter.name}</span>
    </>
  );
};

/**
 * 默认的菜单项渲染(渲染叶子菜单)
 * @param menu  菜单数据
 * @param icon  菜单图标
 */
const defaultMenuItemRender = (menu: RuntimeMenuItem, icon?: React.ReactNode): React.ReactNode => {
  return (
    <>
      {icon}
      <span>{menu.runtimeRouter.name}</span>
    </>
  );
};

/**
 * 获取菜单图标
 * @param icon          图标字符串
 * @param iconScriptUrl 图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/)
 */
const getMenuIcon = (icon?: string, iconScriptUrl?: string): React.ReactNode | undefined => {
  if (!icon) return undefined;
  // 自定义字体图标
  let IconFont: AntdIconFont | undefined;
  if (iconScriptUrl) {
    IconFont = createIconFontCN({
      scriptUrl: iconScriptUrl,
    });
  }
  let iconNode: React.ReactNode | undefined;
  const style: CSSProperties = {marginRight: 8};
  if (IconFont && icon.startsWith('icon-')) {
    iconNode = <IconFont type={icon} style={style}/>;
  } else {
    iconNode = <AntdIcon type={icon} style={style}/>;
  }
  return iconNode;
};

interface GetMenuNodeParam {
  /** 根菜单(过滤隐藏的菜单) */
  showRootMenu: RuntimeMenuItem;
  /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  menuIconScriptUrl?: string;
  /** 自定义渲染菜单项 */
  menuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  /** 自定义菜单项class样式 */
  /** 自定义菜单项class样式 */
  menuItemClassName?: string;
  /** 自定义菜单项样式 */
  menuItemStyle?: CSSProperties;
}

/**
 * 获取 Antd 菜单节点(Menu.Item)
 * @param param 相关参数
 */
const getAntdMenuItems = (param: GetMenuNodeParam): React.ReactNode[] => {
  const {showRootMenu, menuIconScriptUrl, menuItemRender, menuItemClassName, menuItemStyle = {}} = param;
  const nodes: React.ReactNode[] = [];
  if (showRootMenu && showRootMenu.children && showRootMenu.children.length > 0) {
    showRootMenu.children.forEach((menu) => {
      // 菜单图标
      const icon = getMenuIcon(menu.runtimeRouter.icon, menuIconScriptUrl);
      // 菜单内容
      const node = (
        <Menu.Item className={menuItemClassName} style={menuItemStyle} key={menu.menuKey} disabled={false} data-menu={menu}>
          {menuItemRender instanceof Function ? menuItemRender(menu, icon) : defaultMenuItemRender(menu, icon)}
        </Menu.Item>
      );
      nodes.push(node);
    });
  }
  return nodes;
};

export { getHtmlTitle, defaultCustomMenuItemRender, defaultMenuItemRender, getMenuIcon, getAntdMenuItems }
