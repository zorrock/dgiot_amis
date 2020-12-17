import React, { CSSProperties } from 'react';
import lodash from "lodash";
import classNames from 'classnames';
import { Menu } from 'antd';
import { compile } from "path-to-regexp";
import qs from "qs";
import baseX from "base-x";
import stableStringify from "fast-json-stable-stringify";
import AntdIcon, { AntdIconFont, createIconFontCN } from '@/components/AntdIcon';
import styles from '../GlobalSide/SideFirstMenu.less';

/**
 * 获取当前一级菜单的Key
 * @param currentMenu  当前访问页面对应的菜单
 */
const getCurrentFirstMenuKey = (currentMenu?: RuntimeMenuItem): string | undefined => {
  if (!currentMenu) return;
  let currentFirstMenuKey: string | undefined;
  if (currentMenu.parentKeys) {
    if (currentMenu.parentKeys.length >= 1) {
      currentFirstMenuKey = currentMenu.parentKeys[0];
    } else if (currentMenu.parentKeys.length === 0) {
      currentFirstMenuKey = currentMenu.menuKey;
    }
  }
  return currentFirstMenuKey;
};

/**
 * 获取当前一级菜单
 * @param layoutMenuData  全局Layout菜单数据
 */
const getCurrentFirstMenu = (layoutMenuData: LayoutMenuData): RuntimeMenuItem | undefined => {
  const {flattenMenuMap} = layoutMenuData;
  const currentFirstMenuKey = getCurrentFirstMenuKey(layoutMenuData.currentMenu);
  if (!currentFirstMenuKey) return undefined;
  let currentFirstMenu: RuntimeMenuItem | undefined = undefined;
  flattenMenuMap.forEach((menu) => {
    if (currentFirstMenu) return;
    if (menu.menuKey === currentFirstMenuKey) currentFirstMenu = menu;
  });
  return currentFirstMenu;
};

/**
 * 获取默认展开的菜单 - 默认实现
 * @param menuDefaultOpen 是否默认展开菜单
 * @param rootMenu        根菜单
 * @param currentMenu     当前菜单
 */
const getDefaultOpenKeys = (menuDefaultOpen: boolean, rootMenu: RuntimeMenuItem, currentMenu: RuntimeMenuItem): string[] => {
  const defaultOpenKeys: string[] = [];
  const setOpenKeys = (menu: RuntimeMenuItem): void => {
    if (!menu || !menu.children || menu.children.length <= 0 || menu.isHide) return;
    const isOpen = menu.runtimeRouter.defaultOpen ?? menuDefaultOpen;
    if (isOpen && menu.menuKey !== rootMenu.menuKey) {
      defaultOpenKeys.push(menu.menuKey);
    }
    if (isOpen || menu.menuKey === rootMenu.menuKey) {
      menu.children.forEach((childrenMenu) => setOpenKeys(childrenMenu));
    }
  };
  setOpenKeys(rootMenu);
  // 保证当前页面对应的父菜单都是展开状态
  if (currentMenu && currentMenu.parentKeys && currentMenu.parentKeys.length > 0) {
    let breakFlag = true;
    currentMenu.parentKeys.forEach((key) => {
      if (rootMenu.menuKey === key) {
        breakFlag = false;
        return;
      }
      if (breakFlag) return;
      if (defaultOpenKeys.indexOf(key) === -1) {
        defaultOpenKeys.push(key);
      }
    });
  }
  // console.log("getDefaultOpenKeys -> ", defaultOpenKeys);
  return defaultOpenKeys;
};

/**
 * 过滤菜单数据
 * @param menuData    菜单数据
 * @param searchValue 过滤关键字
 */
const getSideMenuData = (menuData: RuntimeMenuItem, searchValue: string): RuntimeMenuItem | undefined => {
  // console.log("getSideMenuData ", menuData, searchValue);
  if (searchValue === undefined || searchValue === null || lodash.trim(searchValue).length <= 0) return menuData;
  const searchKey = searchValue.toLocaleLowerCase();
  const showMenuKeys: Set<string> = new Set<string>([menuData.menuKey]);
  // 过滤 - 收集匹配的 menu.key
  const filterSearch = (menu: RuntimeMenuItem): void => {
    if (menu.runtimeRouter.name && menu.runtimeRouter.name.toLocaleLowerCase().includes(searchKey)) {
      showMenuKeys.add(menu.menuKey);
      if (menu.parentKeys) {
        menu.parentKeys.forEach((item) => showMenuKeys.add(item));
      }
    }
    if (menu.children && menu.children.length > 0) {
      menu.children.forEach((item) => filterSearch(item));
    }
  };
  filterSearch(menuData);
  if (showMenuKeys.size <= 1) return undefined;
  const resMenu: RuntimeMenuItem = {...menuData, children: []};
  const filterKey = (oldMenu: RuntimeMenuItem, newParentMenu: RuntimeMenuItem): void => {
    let menu: RuntimeMenuItem | undefined;
    if (showMenuKeys.has(oldMenu.menuKey)) {
      // 构造子菜单
      menu = {...oldMenu, children: []};
      // if (!oldMenu.children) delete menu.children;
      // 加入子菜单
      if (!newParentMenu.children) newParentMenu.children = [];
      newParentMenu.children.push(menu);
    }
    if (menu && oldMenu.children && oldMenu.children.length > 0) {
      const parentMenu: RuntimeMenuItem = menu;
      oldMenu.children.forEach((item) => filterKey(item, parentMenu));
    }
  };
  if (menuData.children && menuData.children.length > 0) {
    menuData.children.forEach((oldMenu) => filterKey(oldMenu, resMenu));
  }
  // console.log("getSideMenuData -> ", showMenuKeys, resMenu);
  return resMenu;
};

/**
 * 根据 menuKey 获取 RuntimeMenuItem
 * @param flattenMenuMap  拍平的菜单数据
 * @param key             菜单唯一Key(menuKey)
 */
const getMenuItemByKey = (flattenMenuMap: Map<String, RuntimeMenuItem>, key: string): RuntimeMenuItem | undefined => {
  let menuItem: RuntimeMenuItem | undefined = undefined;
  flattenMenuMap.forEach((menu) => {
    if (menuItem) return;
    if (menu.menuKey === key) menuItem = menu;
  });
  return menuItem;
};

/** 路由转换成字符串 */
const routerLocationToStr = (routerLocation: RouterLocation): string => {
  const {pathname, hash, query, state} = routerLocation;
  return `${pathname ?? ""}|${stableStringify(query ?? {})}|${hash ?? ""}|${stableStringify(state)}`;
};

/** 菜单转换成RouterLocation */
const menuToRouterLocation = (menu: RuntimeMenuItem): RouterLocation | undefined => {
  const {runtimeRouter} = menu;
  if (!runtimeRouter) return;
  return {
    pathname: window.location.pathname,
    search: lodash.keys(runtimeRouter.querystring).length > 0 ? `?${qs.stringify(runtimeRouter.querystring)}` : "",
    hash: runtimeRouter.path,
    query: runtimeRouter.querystring,
    state: runtimeRouter.state,
  };
};

/**
 * 根据RuntimeMenuItem进行跳转页面
 * @param menuData                跳转菜单
 * @param location                当前Location
 * @param pageJumpBeforeCalBack 跳转前的回调函数
 */
const pageJumpForRouter = (menuData: RuntimeMenuItem, location: RouterLocation, pageJumpBeforeCalBack?: Function): boolean => {
  const {runtimeRouter} = menuData;
  let {search: currentSearch, hash: currentHash} = location;
  currentSearch = currentSearch && currentSearch.startsWith("?") ? currentSearch.substring(1) : currentSearch;
  currentHash = currentHash && currentHash.startsWith("#") ? currentHash.substring(1) : currentHash;
  const currentPath = lodash.trim(currentSearch).length > 0 ? `${currentSearch}#${currentHash}` : currentHash;
  let newPath: string | undefined;
  let newHash: string | undefined;
  if (runtimeRouter.path) {
    newHash = runtimeRouter.path ?? "";
    if (newHash.indexOf(':') >= 0 && runtimeRouter.pathVariable) {
      newHash = compile(newHash)(runtimeRouter.pathVariable);
    }
    if (runtimeRouter.querystring) {
      newPath = `${qs.stringify(runtimeRouter.querystring)}#${newHash}`;
    } else {
      newPath = newHash;
    }
  } else if (runtimeRouter.redirect) {
    newPath = runtimeRouter.redirect;
  }
  // console.log("pageJumpForMenu -> ", currentUrlPath, newUrlPath);
  if (!newPath || currentPath === newPath) {
    return false;
  }
  // umiHistory.push({pathname: newPathname, search: qs.stringify(router.querystring), query: router.querystring});
  if (pageJumpBeforeCalBack instanceof Function) {
    pageJumpBeforeCalBack();
  }
  return true;
}

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base62Converter = baseX(BASE62);
/** base62编码 */
const base62Encode = (str: string): string => {
  return base62Converter.encode(new Buffer(str));
}

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

export {
  getCurrentFirstMenuKey,
  getCurrentFirstMenu,
  getDefaultOpenKeys,
  getSideMenuData,
  getMenuItemByKey,
  routerLocationToStr,
  menuToRouterLocation,
  pageJumpForRouter,
  base62Encode,
  getHtmlTitle,
  defaultCustomMenuItemRender,
  defaultMenuItemRender,
  getMenuIcon,
  getAntdMenuItems
}
