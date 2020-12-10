import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { SchemaObject } from "amis";
import { $rootMounted, amisRender, rootMountedId } from '@/utils/amis-utils';

const hash = lodash.trim(document.location.hash);
const schemaPath = hash.startsWith("#") ? hash.substr(1, hash.length) : "01schema/schema";

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
    amisRender(this.amisMountedId, schema, resProps);
  }

  reload() {
    const {schema, ...resProps} = this.props;
    amisRender(this.amisMountedId, {
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
    }, resProps);
  }

  render() {
    // const {count} = this.state;
    return (
      <div style={{height: "100%"}}>
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
  const fileExtArr = [".ts", ".tsx", ".js", ".json"];
  let flag = false;
  fileExtArr.forEach(fileExt => {
    if (flag) return;
    if (schemaPath.endsWith(fileExt)) {
      schemaPath = schemaPath.substr(0, schemaPath.length - fileExt.length);
      flag = true;
    }
  });
  // webpack.conf.ts(splitChunks.schema.test) ---> /[\\/]src[\\/]pages[\\/]*.schema\.(ts|tsx|js|jsx|json)$/
  return import(
    /* webpackInclude: /[\\/]src[\\/]pages[\\/].*schema\.(ts|tsx|js|jsx|json)$/ */
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
    amisRender(rootMountedId, schema);
  });

// window.addEventListener("hashchange", funcRef, false);
