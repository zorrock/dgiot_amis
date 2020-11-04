import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render as amisRender } from 'amis';

interface ReactPageProps {
  schema: any;
}

interface ReactPageState {
}

/**
 * 页面组件
 */
class ReactPage extends Component<ReactPageProps, ReactPageState> {
  render() {
    const {schema} = this.props;
    console.log("this.props -> ", this.props);
    return <div>{amisRender(schema, {}, {})}</div>;
  }
}

/**
 * 动态加载 amis schema文件
 * @param schemaPath schema文件路径
 */
const loadSchema = async (schemaPath: string): Promise<any> => {
  return import(
    /* webpackInclude: /[\\/]src[\\/]pages[\\/].*[\\/]schema\.(ts|tsx|js|jsx|json)$/ */
    /* webpackChunkName: "[request].chunk" */
    `@/pages/${schemaPath}/schema`
    );
}

/** 初始化页面 */
loadSchema("01schema").then(({schema}) => {
  const $mounted = document.getElementById('root') || document.createElement('div')
  console.log("schema --> ", schema, $mounted);
  ReactDOM.render(<ReactPage schema={schema}/>, $mounted);
});
