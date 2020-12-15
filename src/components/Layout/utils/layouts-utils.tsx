import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { pathToRegexp } from "path-to-regexp";
import { Menu } from 'antd';
import AntdIcon, { AntdIconFont, createIconFontCN } from '@/components/AntdIcon';
import styles from '../GlobalSide/SideFirstMenu.less';

const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
/** 判断字符串是完整url */
const isUrl = (path: string): boolean => urlReg.test(path);

/**
 * 把path转换成数组
 * /userInfo/2144/id => ['/userInfo','/userInfo/2144,'/userInfo/2144/id']
 * @param path URL路径
 */
const pathToList = (path?: string): string[] => {
  if (!path || path === '/') return ['/'];
  const pathList = path.split('/').filter((i) => i);
  return pathList.map((_, index) => `/${pathList.slice(0, index + 1).join('/')}`);
};

/**
 * 根据url path匹配到对应的RuntimeMenuItem
 * @param flattenMenuMap  拍平的菜单数据 Map&lt;RuntimeMenuItem.routerConfig.path, RuntimeMenuItem&gt;
 * @param path            url path
 */
const pathMatchMenu = (flattenMenuMap: Map<String, RuntimeMenuItem>, path: string): RuntimeMenuItem | undefined => {
  let currentMenu: RuntimeMenuItem | undefined = flattenMenuMap.get(path);
  if (currentMenu) return currentMenu;
  flattenMenuMap.forEach((menu, varPath) => {
    if (currentMenu) return;
    if (pathToRegexp(varPath.replace('?', '')).test(path)) {
      currentMenu = menu;
    }
  });
  return currentMenu;
};

/**
 * 获取当前一级菜单的Key
 * @param currentMenu  当前访问页面对应的菜单
 */
const getCurrentFirstMenuKey = (currentMenu?: RuntimeMenuItem): string | undefined => {
  if (!currentMenu) return;
  let currentFirstMenuKey: string | undefined;
  if (currentMenu.parentKeys) {
    if (currentMenu.parentKeys.length >= 2) {
      currentFirstMenuKey = currentMenu.parentKeys[1];
    } else if (currentMenu.parentKeys.length === 1) {
      currentFirstMenuKey = currentMenu.menuKey;
    }
  }
  return currentFirstMenuKey;
};

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
  showRootMenus: RuntimeMenuItem[];
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
  const {showRootMenus, menuIconScriptUrl, menuItemRender, menuItemClassName, menuItemStyle = {}} = param;
  const nodes: React.ReactNode[] = [];
  if (showRootMenus && showRootMenus.length > 0) {
    showRootMenus.forEach(menu => {
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

export { isUrl, pathToList, pathMatchMenu, getCurrentFirstMenuKey, getHtmlTitle, defaultCustomMenuItemRender, defaultMenuItemRender, getMenuIcon, getAntdMenuItems }
