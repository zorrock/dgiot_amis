import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { render as amisRender, SchemaObject } from 'amis';
import { amisRenderOptions } from "@/utils/amis-render-options";

interface ReactPageProps {
  schema: SchemaObject;
}

interface ReactPageState {
}

/**
 * 页面组件
 */
class ReactPage extends Component<ReactPageProps, ReactPageState> {
  render() {
    const {schema} = this.props;
    // console.log("this.props -> ", this.props);
    return <div>{amisRender(schema, {}, {...amisRenderOptions})}</div>;
  }
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

const hash = lodash.trim(document.location.hash);
const schemaPath = hash.startsWith("#") ? hash.substr(1, hash.length) : "01schema/schema";
const $mounted = document.getElementById('root') || document.createElement('div')
// console.log("schemaPath --> ", schemaPath, $mounted);

/** 初始化页面 */
loadSchema(schemaPath)
  .then(props => {
    // console.log("props --> ", props);
    ReactDOM.render(<ReactPage {...props}/>, $mounted);
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
    ReactDOM.render(<ReactPage schema={schema}/>, $mounted);
  });

// window.addEventListener("hashchange", funcRef, false);
