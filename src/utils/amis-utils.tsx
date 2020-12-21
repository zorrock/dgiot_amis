import React from "react";
import ReactDOM from "react-dom";
import lodash from "lodash";
import { SchemaObject } from "amis";
import { RenderOptions, RootRenderProps } from "amis/src/factory";
import { amisRenderOptions } from './amis-render-options';
import { logger } from './logger';

const log = logger.getLogger("src/utils/amis-utils.tsx");

/** amis组件 */
interface Amis {
  embed(mounted: string, schema: SchemaObject, props: RootRenderProps, options: RenderOptions, pathPrefix?: string): React.ReactNode;

  [name: string]: any;
}

/** Amis Require */
type AmisRequire = (module: string) => Amis;
declare const amisRequire: AmisRequire;

/** amis实例 */
const amis = amisRequire("amis/embed");
/** 页面root挂载点id */
const rootMountedId = "app-root";
/** 页面root挂载点dom对象 */
let $rootMounted: HTMLElement = document.getElementById(rootMountedId)!;

/** 初始化页面 */
const initAppPage = function (): void {
  if (!$rootMounted) {
    $rootMounted = document.createElement('div');
    $rootMounted.id = rootMountedId;
    document.appendChild($rootMounted);
  }
}

/**
 * 渲染amis组件
 * @param mountedId   挂载点id
 * @param schema      amis schema
 * @param props       props
 * @param options     amis选项
 * @param pathPrefix  pathPrefix
 */
const amisRender = function (mountedId: string, schema: SchemaObject, props: RootRenderProps = {}, options: RenderOptions = {}, pathPrefix?: string): React.ReactNode {
  const ops = {...amisRenderOptions, ...options};
  return amis.embed(`#${mountedId}`, schema, props, ops, pathPrefix);
}

/**
 * 动态加载 amis schema文件
 * @param schemaPath schema文件路径
 */
const loadSchema = async function (schemaPath: string): Promise<AmisSchemaPage | ReactPage> {
  const fileExtArr = [".ts", ".tsx", ".js", ".json"];
  let flag = false;
  fileExtArr.forEach(fileExt => {
    if (flag) return;
    if (schemaPath.endsWith(fileExt)) {
      schemaPath = schemaPath.substr(0, schemaPath.length - fileExt.length);
      flag = true;
    }
  });
  if (schemaPath.startsWith("/") || schemaPath.startsWith(".")) schemaPath = schemaPath.substring(1);
  if (schemaPath.startsWith("./")) schemaPath = schemaPath.substring(2);
  // webpack.conf.ts(splitChunks.schema.test) ---> /[\\/]src[\\/]pages[\\/].*\.(schema|react)\.(ts|tsx|js|jsx|json)$/
  return import(
    /* webpackInclude: /[\\/]src[\\/]pages[\\/].*\.(schema|react)\.(ts|tsx|js|jsx|json)$/ */
    /* webpackChunkName: "[request]" */
    `@/pages/${schemaPath}`
    );
}

/**
 * 根据schemaPath加载amis页面
 * @param mountedId     挂载点id
 * @param schemaPath    amis schema path
 * @param props         props
 * @param options       amis选项
 * @param pathPrefix    pathPrefix
 */
const loadPageByPath = async function (mountedId: string, schemaPath: string, props: RootRenderProps = {}, options: RenderOptions = {}, pathPrefix?: string): Promise<React.ReactNode> {
  return loadSchema(schemaPath)
    .then(page => {
      const {schema} = page as AmisSchemaPage;
      const {default: Component} = page as ReactPage;
      if (Component) {
        console.log("Component -> ", Component);
        ReactDOM.render(<Component/>, document.getElementById(`#${mountedId}`));
      } else if (schema) {
        return amisRender(mountedId, (page as AmisSchemaPage).schema, props, options, pathPrefix);
      }
      return;
    })
    .catch(reason => {
      // 默认的异常处理
      const jsonReason = JSON.stringify({schemaPath, reason, msg: lodash.toString(reason)}, null, 2);
      log.error(reason);
      log.error(jsonReason);
      const schema: SchemaObject = {
        type: "page",
        title: `schema文件加载失败: ${schemaPath}`,
        body: {
          type: "html",
          html: `<pre>${jsonReason}</pre>`
        },
      };
      return amisRender(mountedId, schema);
    });
}

// window.addEventListener("hashchange", funcRef, false);

export { amis, rootMountedId, $rootMounted, initAppPage, amisRender, loadSchema, loadPageByPath };
