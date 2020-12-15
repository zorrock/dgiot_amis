// import { pathToRegexp } from 'path-to-regexp';
//
// /**
//  * 根据url path匹配到对应的RuntimeMenuItem
//  * @param flattenMenuMap  拍平的菜单数据 Map&lt;RuntimeMenuItem.routerConfig.path, RuntimeMenuItem&gt;
//  * @param path            url path
//  */
// const pathMatchMenu = (flattenMenuMap: Map<String, RuntimeMenuItem>, path: string): RuntimeMenuItem | undefined => {
//   let currentMenu: RuntimeMenuItem | undefined = flattenMenuMap.get(path);
//   if (currentMenu) return currentMenu;
//   flattenMenuMap.forEach((menu, varPath) => {
//     if (currentMenu) return;
//     if (pathToRegexp(varPath.replace('?', '')).test(path)) {
//       currentMenu = menu;
//     }
//   });
//   return currentMenu;
// };
//
// /**
//  * 获取页面标题
//  * @param layoutMenuData  全局Layout菜单数据
//  * @param htmlTitleSuffix html页面title后缀
//  */
// const getHtmlTitle = (layoutMenuData: LayoutMenuData, htmlTitleSuffix?: string): string => {
//   let title = 'Ant Design Pro';
//   const {flattenMenuMap, currentPath} = layoutMenuData;
//   const menu = pathMatchMenu(flattenMenuMap, currentPath);
//   if (menu) {
//     if (menu.routerConfig.pageTitle && htmlTitleSuffix) {
//       title = `${menu.routerConfig.pageTitle} - ${htmlTitleSuffix ?? ''}`;
//     } else if (menu.routerConfig.pageTitle) {
//       title = menu.routerConfig.pageTitle;
//     } else if (htmlTitleSuffix) {
//       title = htmlTitleSuffix;
//     }
//   } else if (htmlTitleSuffix) {
//     title = htmlTitleSuffix;
//   }
//   return title;
// };
//
// export {pathMatchMenu, getHtmlTitle}
