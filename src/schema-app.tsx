import React from 'react';
import lodash from 'lodash';
import { SchemaObject } from 'amis';
import { amisRenderOptions } from "@/utils/amis-render-options";
import { RenderOptions, RootRenderProps } from "amis/src/factory";

interface Amis {
  embed(mounted: string, schema: SchemaObject, props: RootRenderProps, options: RenderOptions, pathPrefix?: string): React.ReactNode,
}

type AmisRequire = (module: string) => Amis;
declare const amisRequire: AmisRequire;

const amis = amisRequire("amis/embed");
// console.log("amis -> ", amis);
const hash = lodash.trim(document.location.hash);
const schemaPath = hash.startsWith("#") ? hash.substr(1, hash.length) : "01schema/schema";
const $mounted = document.getElementById('root') || document.createElement('div');
// console.log("schemaPath --> ", schemaPath, $mounted);
$mounted.id = "root";


interface ReactPageProps {
  schema: SchemaObject;
}

/**
 * 动态加载 amis schema文件
 * @param schemaPath schema文件路径
 */
const loadSchema = async (schemaPath: string): Promise<ReactPageProps> => {
  return import(
    /* webpackInclude: /[\\/]src[\\/]pages[\\/].*[\\/]schema.*\.(ts|tsx|js|jsx|json)$/ */
    /* webpackChunkName: "[request].chunk" */
    `@/pages/${schemaPath}`
    );
}


/** 初始化页面 */
loadSchema(schemaPath)
  .then(props => {
    // console.log("props --> ", props);
    const {schema, ...resProps} = props;
    amis.embed("#root", schema, {...resProps}, {...amisRenderOptions});
  })
  .catch(reason => {
    // 默认的异常处理
    const jsonReason = JSON.stringify({schemaPath, reason, msg: lodash.toString(reason)}, null, 2);
    console.error(reason);
    console.error(jsonReason);
    const schema: SchemaObject = {
      type: "page",
      title: `schema文件加载失败: ${schemaPath}`,
      body: {
        type: "html",
        html: `<pre>${jsonReason}</pre>`
      },
    };
    amis.embed("#root", schema, {}, {...amisRenderOptions});
  });

// window.addEventListener("hashchange", funcRef, false);
