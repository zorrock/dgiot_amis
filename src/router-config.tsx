import React from 'react';
import { CopyrightCircleOutlined } from "@ant-design/icons";
import { LayoutConfig, LayoutType } from '@/utils/router';
import { SideFirstMenuMode } from "@/components/Layout/GlobalSide";

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
    layoutProps: {
      hideGlobalHeader: false,
      hideGlobalFooter: false,
      globalFooterCopyright: <>Copyright <CopyrightCircleOutlined/> 2020 武汉XX科技有限公司 鄂ICP备19029XXX号</>,
      globalSideMenuWidth: 100,
      globalSideMenuMode: SideFirstMenuMode.AntdMenu,
    },
    routes: [
      {
        path: "/curd",
        name: "CURD",
        icon: "ProfileOutlined",
        routes: [
          {path: "/00", name: "简单CURD", pagePath: "/amis/curd-00-schema.ts"},
        ],
      },
      {
        path: "/form",
        name: "表单",
        icon: "ContainerOutlined",
        routes: [
          {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
        ],
      },
      // {
      //   path: "/form1",
      //   name: "表单1",
      //   icon: "TableOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form2",
      //   name: "表单2",
      //   icon: "LayoutOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form3",
      //   name: "表单3",
      //   icon: "SmileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form4",
      //   name: "表单4",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form5",
      //   name: "表单5",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form6",
      //   name: "表单6",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // }, {
      //   path: "/form7",
      //   name: "表单7",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // }, {
      //   path: "/form8",
      //   name: "表单8",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form9",
      //   name: "表单9",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form10",
      //   name: "表单10",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form11",
      //   name: "表单11",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form12",
      //   name: "表单12",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // }, {
      //   path: "/form13",
      //   name: "表单13",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form14",
      //   name: "表单14",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form15",
      //   name: "表单15",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00-schema.ts"},
      //   ],
      // },
    ],
    401: "",
    403: "",
    404: "",
  }
];

export { layoutSettings, routerConfigs };
