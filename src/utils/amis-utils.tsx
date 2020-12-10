import React from "react";
import { SchemaObject } from "amis";
import { RenderOptions, RootRenderProps } from "amis/src/factory";
import { amisRenderOptions } from '@/utils/amis-render-options';

interface Amis {
  embed(mounted: string, schema: SchemaObject, props: RootRenderProps, options: RenderOptions, pathPrefix?: string): React.ReactNode;

  [name: string]: any;
}

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

export { amis, rootMountedId, $rootMounted, initAppPage, amisRender };
