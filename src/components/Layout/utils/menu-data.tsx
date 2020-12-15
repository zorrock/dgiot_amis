import memoizeOne from 'memoize-one';
import isEqual from 'lodash.isequal';

/**
 * 拍平的菜单数据
 * <pre>
 *   Map<path, RuntimeMenuItem>
 * </pre>
 */
const flattenMenuData = (rootMenu: RuntimeMenuItem): Map<string, RuntimeMenuItem> => {
  // Map用于确保key的顺序
  const flattenMenuMap = new Map<string, RuntimeMenuItem>();
  flattenMenuMap.set(rootMenu.runtimeRouter.path, rootMenu);
  // 拍平菜单数据
  const flattenMenuArray = (menuArray: RuntimeMenuItem[], parent?: RuntimeMenuItem) => {
    menuArray.forEach((menuItem) => {
      if (!menuItem) return;
      if (menuItem && menuItem.children) {
        // 递归
        flattenMenuArray(menuItem.children, menuItem);
      }
      flattenMenuMap.set(menuItem.runtimeRouter.path, menuItem);
    });
  };
  if (rootMenu.children) {
    flattenMenuArray(rootMenu.children);
  }
  return flattenMenuMap;
};
/** 使用memoizeOne优化性能 */
const memoizeOneFlattenMenuData = memoizeOne(flattenMenuData, isEqual);

/**
 * 调整菜单数据结构最终变成
 * <pre>
 *   { [fullPath: string]: RuntimeMenuItem; }
 * </pre>
 */
function fromEntries(breadcrumbMap: Map<string, RuntimeMenuItem>) {
  return [...breadcrumbMap].reduce((obj: LayoutMenuData['flattenMenu'], [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

/**
 * 过滤隐藏的菜单
 * @param rootMenu 根菜单
 */
const filterMenuData = (rootMenu: RuntimeMenuItem): RuntimeMenuItem | undefined => {
  if (rootMenu.runtimeRouter.hideMenu) return;
  if (rootMenu.runtimeRouter.hideChildrenMenu) {
    const {children, ...rootProps} = rootMenu;
    return {...rootProps, children: []};
  }
  const showChildren: RuntimeMenuItem[] = [];
  rootMenu.children.forEach((item) => {
    // 递归过滤隐藏的菜单
    const child = filterMenuData(item);
    if (child) showChildren.push(child);
  });
  if (showChildren.length > 0) rootMenu.children = showChildren;
  return rootMenu;
};

interface GetLayoutMenuDataParams {
  /** location 信息 */
  location: RouterLocation;
  /** 一级菜单 */
  rootMenus: RuntimeMenuItem[];
  /** 当前Menu */
  currentMenu: RuntimeMenuItem;
}

/** 获取菜单数据 */
const getLayoutMenuData = (params: GetLayoutMenuDataParams): LayoutMenuData => {
  const {location, rootMenus, currentMenu} = params;
  // 拍平的菜单数据
  const flattenMenuMap = new Map<string, RuntimeMenuItem>();
  rootMenus.forEach(rootMenu => {
    const map = memoizeOneFlattenMenuData(rootMenu);
    map.forEach((menu, path) => flattenMenuMap.set(path, menu));
  });
  // 处理拍平的菜单数据-变成Object
  const flattenMenu = fromEntries(flattenMenuMap);
  // 过滤隐藏的菜单
  const showRootMenus: RuntimeMenuItem[] = [];
  rootMenus.forEach(rootMenu => {
    const showRootMenu = filterMenuData(rootMenu);
    if (showRootMenu) showRootMenus.push(showRootMenu);
  });
  // 当前访问Url地址
  const currentPath = location.pathname ?? '/';
  return {rootMenus, showRootMenus, flattenMenuMap, flattenMenu, currentPath, currentMenu};
}

export { GetLayoutMenuDataParams, getLayoutMenuData };