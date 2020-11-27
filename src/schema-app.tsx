import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { SchemaObject } from 'amis';
import { amisRenderOptions } from "@/utils/amis-render-options";
import { RenderOptions, RootRenderProps } from "amis/src/factory";

interface Amis {
  embed(mounted: string, schema: SchemaObject, props: RootRenderProps, options: RenderOptions, pathPrefix?: string): React.ReactNode;

  [name: string]: any;
}

type AmisRequire = (module: string) => Amis;
declare const amisRequire: AmisRequire;

const amis = amisRequire("amis/embed");
// console.log("amis -> ", amis);
const hash = lodash.trim(document.location.hash);
const schemaPath = hash.startsWith("#") ? hash.substr(1, hash.length) : "01schema/schema";

const rootMountedId = "app-root";
let $rootMounted = document.getElementById(rootMountedId)
if (!$rootMounted) {
  $rootMounted = document.createElement('div');
  $rootMounted.id = rootMountedId;
  document.appendChild($rootMounted);
}

interface ReactPageProps {
  schema: SchemaObject;
}

interface ReactPageState {
  count: number;
}

class ReactPage extends Component<ReactPageProps, ReactPageState> {
  private amisMountedId = "amis-root";

  constructor(props: ReactPageProps) {
    super(props);
    this.state = {count: 0};
  }

  componentDidMount() {
    // console.log("$amisMounted -> ", document.getElementById(this.amisMountedId));
    const {schema, ...resProps} = this.props;
    // amis.embed(`#${amisMountedId}`, schema, {...resProps}, {...amisRenderOptions});
    amis.embed(`#${this.amisMountedId}`, schema, {...resProps}, {...amisRenderOptions});
  }

  reload() {
    amis.embed(`#${this.amisMountedId}`, {
      type: "page",
      title: "动态变化",
      body: [
        {
          type: "form",
          mode: "horizontal",
          api: "https://houtai.baidu.com/api/mock2/form/saveForm",
          controls: [
            {
              label: "Name",
              type: "text",
              name: "name"
            },
            {label: "Email", type: "email", name: "email"},
          ],
        },
      ],
    }, {}, {...amisRenderOptions});
  }

  render() {
    // const {count} = this.state;
    return (
      <div>
        {/*<button onClick={() => {*/}
        {/*  this.setState({count: count + 1});*/}
        {/*  if (count > 3) {*/}
        {/*    this.reload();*/}
        {/*  }*/}
        {/*}}>{count}</button>*/}
        <div id={this.amisMountedId}/>
      </div>
    );
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


/** 初始化页面 */
loadSchema(schemaPath)
  .then(props => {
    // console.log("props --> ", props);
    const {schema, ...resProps} = props;
    ReactDOM.render(<ReactPage schema={schema} {...resProps}/>, $rootMounted);
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
    amis.embed(`#${rootMountedId}`, schema, {}, {...amisRenderOptions});
  });

// window.addEventListener("hashchange", funcRef, false);
