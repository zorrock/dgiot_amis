#### 项目介绍

dgiot_amis 是基于百度的 [amis](https://github.com/baidu/amis) 低代码框架开发的管理后台前端项目，旨在提供低门槛、高效率、开箱即用的管理后台前端项目。

##### 1.本项目的应用范围和人群
1. 企业内部运营后端项目，功能较为简单的管理后台
1. 适合有一点前端基础(写过html + js + css)的程序员，不需要懂大前端技术(npm、webpack、react/vue......)

##### 2.本项目优势
1. 门槛极低，使用json来定义页面，会写json就能开发页面
1. 提供完整的管理后台界面解决方案，内置菜单、用户登录登出、401、403、404等基础页面功能，真正的开箱即用
1. 支持所有amis框架的UI组件(100+)
1. 支持扩展，页面开发支持多种技术：amis(主要)、react、传统html。支持html页面内嵌集成
1. 经历了某上市公司的内部多个项目的线上实战考验
1. 开发效率提升3倍以上，熟练amis框架开发效率提升6倍以上

##### 3.效果预览

线上预览地址: [http://dgiot_amis.msvc.top/](http://dgiot_amis.msvc.top/) (admin/123456)

系统截图

![登录](https://cdn-static-resources.oss-cn-hangzhou.aliyuncs.com/amis-admin/screenshot/login.png)

![查询列表](https://cdn-static-resources.oss-cn-hangzhou.aliyuncs.com/amis-admin/screenshot/curd.png)

![表单](https://cdn-static-resources.oss-cn-hangzhou.aliyuncs.com/amis-admin/screenshot/detail-form.png)

![系统演示](https://cdn-static-resources.oss-cn-hangzhou.aliyuncs.com/amis-admin/screenshot/%E7%B3%BB%E7%BB%9F%E6%BC%94%E7%A4%BA.gif)
#### 快速开始

##### 1.安装Node.js(建议12.x版本)

下载地址: [https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/)

```shell
// 配置npm源
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
```

##### 2.安装yarn

```shell
npm install -g yarn
yarn -v
```

```shell
// 配置yarn源
yarn config set registry https://registry.npm.taobao.org -g
yarn config set disturl https://npm.taobao.org/dist -g
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
yarn config set operadriver_cdnurl https://cdn.npm.taobao.org/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents -g
```

##### 3.安装TypeScript

```shell
yarn global add typescript
tsc -v
```

##### 4.初始化 & 开发

```shell
cd ./dgiot_amis
// 初始化
yarn run project-init
// 开发
yarn run dev
```

1. 使用谷歌浏览器打开: http://127.0.0.1:8000/schema-app.html
2. 页面代码都在`/src/pages`文件夹中，一个页面就是一个文件
3. 菜单配置在`/src/router-config.tsx`文件中定义


> 建议使用`IntelliJ IDEA`或者`WebStorm`开发工具
