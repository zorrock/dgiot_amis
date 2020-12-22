import React from 'react';
import { CopyrightCircleOutlined } from "@ant-design/icons";
import { LayoutConfig, LayoutType } from '@/utils/router';
import { SideFirstMenuMode } from "@/components/Layout/GlobalSide";

const layoutSettings: LayoutSettings = {
  menu: { defaultOpen: true },
  iconScriptUrl: "//at.alicdn.com/t/font_1326886_bbehrpsvyl.js",
  htmlTitleSuffix: "",
};

const routerConfigs: LayoutConfig[] = [
  // {
  //   path: "",                     // 匹配路径(支持path-to-regexp)
  //   layout: LayoutType.Blank,     // 页面布局类型
  //   layoutProps: {},              // 页面布局配置
  //   routes: [                     // 路由配置
  //     {
  //       path: "",                 // 路由路径(支持path-to-regexp)
  //       pathVariable: {},         // 路由路径中有变量时，配置的路径变量对象
  //       querystring: {},          // 设置路由路径的queryString部分
  //       exact: true,              // 表示是否严格匹配
  //       pagePath: "",             // 页面路径
  //       redirect: "",             // 跳转到指定页面
  //       icon: "",                 // 路由图标
  //       name: "",                 // 路由名称
  //       pageTitle: "",            // 页面标题
  //       defaultOpen: true,        // 默认展开子路由
  //       breadcrumbName: "",       // 面包屑文本(不配置就默认取“name”)
  //       hideBreadcrumb: true,     // 是否隐藏面包屑导航
  //       groupName: "",            // 路由分组名称(配置才会分组，不配置就不分组)
  //       hideMenu: false,          // 隐藏当前路由和子路由
  //       hideChildrenMenu: false,  // 隐藏子路由
  //       state: {},                // 路由状态
  //       authority: "",            // 路由权限控制(权限字符串)
  //       routes: [],               // 子路由配置
  //     },
  //   ],
  //   401: "",                      // 401未登录页面
  //   403: "",                      // 403无权访问页面
  //   404: "",                      // 404页面不存在
  // },
  {
    path: "/blank",
    layout: LayoutType.Blank,
    layoutProps: {},
    routes: [
      {
        path: "/curd",
        name: "CURD",
        icon: "TableOutlined",
        routes: [
          { path: "/00", name: "通用CURD", pagePath: "/amis/curd-00.schema.ts" },
          { path: "/01", name: "常规CURD", pagePath: "/amis/curd-01-general.schema.ts" },
          { path: "/02", name: "空白页", pagePath: "/amis/empty-page.schema.ts" },
          { path: "/03", name: "ReactDemo页面", pagePath: "/react/01demo.react.tsx" },
        ],
      },
    ],
  },
  {
    path: "/nest-side",
    layout: LayoutType.NestSide,
    layoutProps: {
      hideGlobalHeader: true,
      hideGlobalFooter: false,
      globalFooterCopyright: <>Copyright <CopyrightCircleOutlined/> 2020 武汉XX科技有限公司 鄂ICP备19029XXX号</>,
      globalSideMenuWidth: 100,
      globalSideMenuMode: SideFirstMenuMode.AntdMenu,
    },
    routes: [
      {
        path: "/curd",
        name: "CURD",
        icon: "TableOutlined",
        routes: [
          { path: "/00", name: "通用CURD", icon: "TableOutlined", pagePath: "/amis/curd-00.schema.ts" },
          { path: "/01", name: "常规CURD", icon: "TableOutlined", pagePath: "/amis/curd-01-general.schema.ts" },
        ],
      },
      {
        path: "/form",
        name: "表单",
        icon: "FormOutlined",
        routes: [
          { path: "/00", name: "所有表单类型", icon: "EditOutlined", pagePath: "/amis/form-00.schema.ts" },
          { path: "/01", name: "表单布局", icon: "EditOutlined", pagePath: "/amis/form-01-layout.schema.ts" },
          { path: "/02", name: "表单校验", icon: "EditOutlined", pagePath: "/amis/form-02-verify.schema.ts" },
          { path: "/03", name: "对话框表单", icon: "EditOutlined", pagePath: "/amis/form-03-dialog.schema.ts" },
        ],
      },
      {
        path: "/react",
        name: "React页面",
        icon: "BulbOutlined",
        routes: [
          { path: "/00", name: "ReactDemo页面", icon: "BulbOutlined", pagePath: "/react/01demo.react.tsx" },
        ],
      },
      // -------------------------------------------------------------------------
      // 通用组件
      {
        path: '/general',
        name: '通用组件',
        icon: 'AppstoreOutlined',
        routes: [
          { path: '/icon', name: 'AntdIcon(图标)', icon: 'PictureOutlined', pagePath: '/amis/curd-00.schema.ts' },
          { path: '/toolbar', name: 'ToolBar(工具栏)', icon: 'ToolOutlined', pagePath: '/amis/curd-00.schema.ts' },
        ],
      },
      // 导航组件
      {
        path: '/navigation',
        name: '导航组件',
        icon: 'MenuOutlined',
        routes: [{ path: '/001', name: '空白页', icon: 'PictureOutlined', pagePath: '/amis/empty-page.schema.ts' }],
      },
      // 页面布局
      {
        path: '/layout',
        name: '页面布局',
        icon: 'LayoutOutlined',
        routes: [{ path: '/001', name: '空白页', icon: 'PictureOutlined', pagePath: '/amis/empty-page.schema.ts' }],
      },
      // 数据录入
      {
        path: '/data_entry',
        name: '数据录入',
        icon: 'FormOutlined',
        routes: [{ path: '/001', name: '空白页', icon: 'PictureOutlined', pagePath: '/amis/empty-page.schema.ts' }],
      },
      // 数据展示
      {
        path: '/data_display',
        name: '数据展示',
        icon: 'ProfileOutlined',
        routes: [
          {
            path: '/detail',
            name: '数据详情',
            icon: 'ContainerOutlined',
            routes: [
              { path: '/detail_table', name: '详情表格', pagePath: '/amis/empty-page.schema.ts' },
              { path: '/detail_modal', name: '对话框详情表格', pagePath: '/amis/empty-page.schema.ts' },
            ],
          },
          {
            path: '/table',
            name: 'Table表格',
            icon: 'TableOutlined',
            routes: [
              { path: '/data_table_base', name: '数据表格(基本)', pagePath: '/amis/empty-page.schema.ts' },
              { path: '/data_table_data', name: '数据表格(数据)', pagePath: '/amis/form-03-dialog.schema.ts' },
            ],
          },
        ],
      },
      // 反馈组件
      {
        path: '/feedback',
        name: '反馈组件',
        icon: 'SmileOutlined',
        routes: [{ path: '/001', name: '空白页', icon: 'PictureOutlined', pagePath: '/amis/empty-page.schema.ts' }],
      },
      // 其他组件
      {
        path: '/component/other',
        name: '其他组件',
        icon: 'EllipsisOutlined',
        routes: [{ path: '/001', name: '空白页', icon: 'PictureOutlined', pagePath: '/amis/empty-page.schema.ts' }],
      },
      {
        path: "/form1",
        name: "表单1",
        icon: "TableOutlined",
        routes: [
          { path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts" },
        ],
      },
      {
        path: "/form2",
        name: "表单2",
        icon: "LayoutOutlined",
        routes: [
          { path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts" },
        ],
      },
      {
        path: "/form3",
        name: "表单3",
        icon: "SmileOutlined",
        routes: [
          { path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts" },
        ],
      },
      {
        path: "/form4",
        name: "表单4",
        icon: "ProfileOutlined",
        routes: [
          { path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts" },
        ],
      },
      {
        path: "/form5",
        name: "表单5",
        icon: "ProfileOutlined",
        routes: [
          { path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts" },
        ],
      },
      // {
      //   path: "/form6",
      //   name: "表单6",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // }, {
      //   path: "/form7",
      //   name: "表单7",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // }, {
      //   path: "/form8",
      //   name: "表单8",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form9",
      //   name: "表单9",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form10",
      //   name: "表单10",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form11",
      //   name: "表单11",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form12",
      //   name: "表单12",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // }, {
      //   path: "/form13",
      //   name: "表单13",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form14",
      //   name: "表单14",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // },
      // {
      //   path: "/form15",
      //   name: "表单15",
      //   icon: "ProfileOutlined",
      //   routes: [
      //     {path: "/00", name: "简单表单", pagePath: "/amis/form-00.schema.ts"},
      //   ],
      // },
    ],
    401: "",
    403: "",
    404: "",
  }
];

export { layoutSettings, routerConfigs };
