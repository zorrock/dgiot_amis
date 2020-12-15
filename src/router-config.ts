import { LayoutConfig, LayoutType } from '@/utils/router';

const layoutSettings: LayoutSettings = {
  menu: {defaultOpen: true},
  iconScriptUrl: "//at.alicdn.com/t/font_1326886_bbehrpsvyl.js",
  htmlTitleSuffix: "",
};

const routerConfigs: LayoutConfig[] = [
  {
    path: "",                     // 匹配路径(支持path-to-regexp)
    layout: LayoutType.Blank,     // 页面布局类型
    layoutProps: {},              // 页面布局配置
    routes: [                     // 路由配置
      {
        path: "",                 // 路由路径(支持path-to-regexp)
        pathVariable: {},         // 路由路径中有变量时，配置的路径变量对象
        querystring: {},          // 设置路由路径的queryString部分
        exact: true,              // 表示是否严格匹配
        pagePath: "",             // 页面路径
        redirect: "",             // 跳转到指定页面
        icon: "",                 // 路由图标
        name: "",                 // 路由名称
        pageTitle: "",            // 页面标题
        defaultOpen: true,        // 默认展开子路由
        breadcrumbName: "",       // 面包屑文本(不配置就默认取“name”)
        hideBreadcrumb: true,     // 是否隐藏面包屑导航
        groupName: "",            // 路由分组名称(配置才会分组，不配置就不分组)
        hideMenu: false,          // 隐藏当前路由和子路由
        hideChildrenMenu: false,  // 隐藏子路由
        state: {},                // 路由状态
        authority: "",            // 路由权限控制(权限字符串)
        routes: [],               // 子路由配置
      },
    ],
    401: "",                      // 401未登录页面
    403: "",                      // 403无权访问页面
    404: "",                      // 404页面不存在
  },
  {
    path: "/nest-side",
    layout: LayoutType.NestSide,
    layoutProps: {},
    routes: [
      {path: "/curd-00", pagePath: "/amis/curd-00-schema.ts", name: "简单CURD"},
      {path: "/form-00", pagePath: "/amis/form-00-schema.ts", name: "简单表单"},
    ],
    401: "",
    403: "",
    404: "",
  }
];

export { layoutSettings, routerConfigs };
