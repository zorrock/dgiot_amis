import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import { alert, confirm, render as amisRender, toast } from 'amis';
import { AmisSchema, AmisSchemaType } from "@/amis-types";

interface ReactPageProps {
  schema: AmisSchema;
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
    return <div>{amisRender(schema, {}, {
      // env
      // 这些是 amis 需要的一些接口实现
      // 可以参考后面的参数介绍。
      theme: "default",

      jumpTo: (
        location: string /*目标地址*/,
        action: any /* action对象*/
      ) => {
        // 用来实现页面跳转, actionType:link、url 都会进来。
        // 因为不清楚所在环境中是否使用了 spa 模式，所以自己实现这个方法吧。
      },

      updateLocation: (
        location: string /*目标地址*/,
        replace: boolean /*是replace，还是push？*/
      ) => {
        // 地址替换，跟 jumpTo 类似
      },

      fetcher: ({
                  url, // 接口地址
                  method, // 请求方法 get、post、put、delete
                  data, // 请求数据
                  responseType,
                  config, // 其他配置
                  headers // 请求头
                }: any) => {
        config = config || {};
        config.withCredentials = true;
        responseType && (config.responseType = responseType);

        if (config.cancelExecutor) {
          config.cancelToken = new (axios as any).CancelToken(
            config.cancelExecutor
          );
        }

        config.headers = headers || {};

        if (method !== 'post' && method !== 'put' && method !== 'patch') {
          if (data) {
            config.params = data;
          }

          return (axios as any)[method](url, config);
        } else if (data && data instanceof FormData) {
          config.headers = config.headers || {};
          config.headers['Content-Type'] = 'multipart/form-data';
        } else if (
          data &&
          typeof data !== 'string' &&
          !(data instanceof Blob) &&
          !(data instanceof ArrayBuffer)
        ) {
          data = JSON.stringify(data);
          config.headers = config.headers || {};
          config.headers['Content-Type'] = 'application/json';
        }

        return (axios as any)[method](url, data, config);
      },
      isCancel: (value: any) => (axios as any).isCancel(value),
      notify: (
        type: 'error' | 'success' /**/,
        msg: string /*提示内容*/
      ) => {
        toast[type]
          ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
          : console.warn('[Notify]', type, msg);
      },
      alert,
      confirm,
      copy: content => {
        copy(content);
        toast.success('内容已复制到粘贴板');
      }
    })}</div>;
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
    const schema: AmisSchema = {
      type: AmisSchemaType.Page,
      title: `schema文件加载失败: ${schemaPath}`,
      body: {
        type: AmisSchemaType.Html,
        html: `<pre>${jsonReason}</pre>`
      },
    };
    ReactDOM.render(<ReactPage schema={schema}/>, $mounted);
  });

// window.addEventListener("hashchange", funcRef, false);
