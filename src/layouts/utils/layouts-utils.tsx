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

export { getHtmlTitle }
