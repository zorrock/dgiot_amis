import React from 'react';
import classNames from "classnames";
import { CopyrightCircleOutlined } from "@ant-design/icons";
import { LayoutConfig, LayoutType } from '@/utils/router';
import { SideFirstMenuMode } from "@/components/Layout/GlobalSide";
import { ActionKey, AvatarMode, UserAvatar } from "@/components/UserAvatar";
import { userLogout } from "@/service/login-service";

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
      { path: "/login", name: "用户登录", pagePath: "login.react.tsx" },
      {
        path: "/curd",
        name: "CURD",
        icon: "TableOutlined",
        routes: [
          { path: "/00", name: "通用CURD", pagePath: "/amis/curd-00.schema.ts" },
          { path: "/01", name: "常规CURD", pagePath: "/amis/curd-01-general.schema.ts" },
          { path: "/02", name: "空白页", pagePath: "/amis/empty-page.schema.ts" },
          { path: "/03", name: "ReactDemo页面", pagePath: "/react/01demo.react.tsx" },
          { path: "/04", name: "内嵌百度", pagePath: "https://www.baidu.com/" },
        ],
      },
    ],
    404: "/404.react.tsx",
  },
  {
    path: "/nest-side",
    layout: LayoutType.NestSide,
    layoutProps: {
      hideGlobalHeader: false,
      globalHeaderRightRender: (props, className, elementMap) => {
        const currentUser = window.currentUser;
        elementMap.set("avatar", (
          <UserAvatar
            key="avatar"
            mode={AvatarMode.Horizontal}
            avatarSrc={currentUser?.avatar}
            nickname={currentUser?.nickname}
            onMenuClick={key => {
              switch (key) {
                case ActionKey.PersonalCenter:
                  break;
                case ActionKey.PersonalSettings:
                  break;
                case ActionKey.Logout:
                  userLogout(layoutSettings.logoutApi!, layoutSettings.loginPath!);
                  break;
              }
            }}
          />
        ));
        const { rightClassName, rightStyle = {} } = props;
        return (
          <div className={classNames(className, rightClassName)} style={rightStyle}>
            {[...elementMap.values()]}
          </div>
        );
      },
      hideGlobalFooter: false,
      globalFooterCopyright: <>Copyright <CopyrightCircleOutlined key="copyright"/> 2020 武汉XX科技有限公司 鄂ICP备19029XXX号</>,
      globalSideMenuWidth: 100,
      globalSideMenuMode: SideFirstMenuMode.AntdMenu,
      globalSideBottomRender: (props, className, elementMap) => {
        const currentUser = window.currentUser;
        elementMap.set("avatar", (
          <UserAvatar
            key="avatar"
            mode={AvatarMode.Vertical}
            avatarSrc={currentUser?.avatar}
            nickname={currentUser?.nickname}
            onMenuClick={key => {
              switch (key) {
                case ActionKey.PersonalCenter:
                  break;
                case ActionKey.PersonalSettings:
                  break;
                case ActionKey.Logout:
                  userLogout(layoutSettings.logoutApi!, layoutSettings.loginPath!);
                  break;
              }
            }}
          />
        ));
        const { bottomClassName, bottomStyle = {} } = props;
        return (
          <div className={classNames(className, bottomClassName)} style={bottomStyle}>
            {[...elementMap.values()]}
          </div>
        );
      },
      sideMenuEnableSearchMenu: false,
    },
    routes: [
      // -------------------------------------------------------------------------
      {
        path: "/curd",
        name: "CURD",
        icon: "TableOutlined",
        routes: [
          { path: "/00", name: "通用CURD", icon: "TableOutlined", pagePath: "/amis/curd-00.schema.ts" },
          { path: "/01", name: "常规CURD", icon: "TableOutlined", pagePath: "/amis/curd-01-general.schema.ts" },
          { path: "/02", name: "新浪微博", icon: "LinkOutlined", openOptions: { url: "https://weibo.com/" } },
          { path: "/03", name: "内嵌微博", icon: "WeiboOutlined", pagePath: "https://weibo.com/" },
          { path: "/04", name: "内嵌百度", icon: "WeiboOutlined", pagePath: "https://www.baidu.com/" },
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
      {
        path: "/help",
        name: "帮助文档",
        icon: "QuestionCircleOutlined",
        openOptions: {
          url: "https://baidu.gitee.io/amis/docs/index",
          target: "_blank",
          features: "directories=no, status=no, resizable=no, copyhistory=yes, width=800, height=400",
        },
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
    ],
    // 401: "/blank/login",
    403: "/403.react.tsx",
    404: "/404.react.tsx",
  }
];

const layoutSettings: LayoutSettings = {
  menu: { defaultOpen: true },
  iconScriptUrl: "//at.alicdn.com/t/font_1326886_bbehrpsvyl.js",
  htmlTitleSuffix: "",
  loginPath: "/blank/login",
  defaultPath: "/nest-side/curd/00",
  // loginApi: "/login",
  // logoutApi: "/logout",
  // currentUserApi: "/current_user",
  // menuApi: `${serverHost}/!/amis-api/curd-page@menu`,
};

export { routerConfigs, layoutSettings };
