import { RenderOptions } from 'amis/lib/factory';
import qs from "qs";
import axios, { AxiosRequestConfig, Canceler, ResponseType } from "axios";

interface RequestConfig extends AxiosRequestConfig {
  cancelExecutor?: (cancel: Canceler) => void;
}

export interface FetcherConfig {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  data?: any;
  config: RequestConfig;
  responseType?: ResponseType;
  headers?: any;
}

const hasValue = (val: any): boolean => val !== null && val !== undefined;

axios.interceptors.request.use(request => {
  console.log("全局请求拦截 request -> ", request);
  const path = request.url?.split('?')[0];
  const querystring = request.url?.split('?')[1];
  if (!querystring) return request;
  const params = qs.parse(querystring ?? "");
  if (!params) return request;
  if (params.orderDir && params.orderBy && /(asc|desc)/.test(`${params.orderDir}`)) {
    params.orderField = params.orderBy;
    params.sort = params.orderDir;
  }
  request.url = `${path}?${qs.stringify(params)}`;
  return request;
});

axios.interceptors.response.use(response => {
    console.log("全局响应拦截 response -> ", response);
    if (response.data && !hasValue(response.data.msg) && !hasValue(response.data.status) && !hasValue(response.data.data)) {
      response.data = {status: response.status === 200 ? 0 : -1, msg: "", data: response.data};
    }
    if (response.status !== 200) response.status = 200;
    if (response.data && response.data.validMessageList instanceof Array) {
      response.data = {data: response.data.validMessageList};
    }
    const payload = response.data;
    // console.log("payload -> ", payload);
    if (!payload) return response;
    const data = payload.data;
    if (!data) return response;
    // 全局处理分页查询响应字段问题
    const {records, total, searchCount, pages, rows, count} = data;
    if (hasValue(records) && hasValue(total) && hasValue(searchCount) && hasValue(pages) && !hasValue(rows) && !hasValue(count)) {
      data.rows = data.records;
      data.count = data.total;
    }
    // 数据校验适配
    if (data instanceof Array && data.length > 0 && data[0] && data[0].code && data[0].entityName && data[0].errorMessage) {
      payload.data = {};
      payload.status = 422;
      payload.errors = {};
      (data as Array<any>).forEach(value => {
        payload.errors[value.filed] = value.errorMessage;
      });
      payload.msg = "服务端数据校验失败";
    }
    // console.log("payload -> ", payload);
    return response;
  },
);

const amisRenderOptions: RenderOptions = {
  /** 主题配置(default（默认主题）、cxd（云舍）和dark（暗黑）) */
  theme: "default",
  /** 默认为 "global"，决定 store 是否为全局共用的，如果想单占一个 store，请设置不同的值 */
  session: "global",
  /** 发送http请求 */
  fetcher: fetcherConfig => {
    const {url, method = "get", responseType, config = {}, headers = {}} = fetcherConfig as FetcherConfig;
    let {data} = fetcherConfig as FetcherConfig;
    config.withCredentials = true;
    if (responseType) config.responseType = responseType;
    if (config.cancelExecutor) config.cancelToken = new axios.CancelToken(config.cancelExecutor);
    config.headers = headers;
    if (method !== "post" && method !== "put" && method !== "patch") {
      if (data) config.params = data;
      return axios[method](url, config);
    } else if (data && data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (data && typeof data !== 'string' && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
      data = JSON.stringify(data);
      config.headers["Content-Type"] = "application/json";
    }
    return axios[method](url, data, config);
  },
  /** 是否取消http请求 */
  isCancel: value => axios.isCancel(value),
  /** 用来实现通知 */
  // notify: (type, msg) => {
  //   if (!toast[type]) {
  //     console.warn("[Notify]", type, msg);
  //     return;
  //   }
  //   toast[type](msg, type === "error" ? "系统错误" : "系统消息");
  // },
  /** 用来实现警告提示 */
  // alert: msg => alert(msg),
  /** 用来实现确认框 */
  // confirm: (msg, title) => confirm(msg, title),
  /** 用来实现内容复制 */
  // copy: contents => {
  //   copy(contents);
  //   toast.success('内容已复制到粘贴板');
  // },
  /** 用来实现页面跳转 */
  // jumpTo: (to, action, ctx) => {
  // },
  /** 地址替换，跟 jumpTo 类似 */
  updateLocation: (location: string /*目标地址*/, replace: boolean /*是replace，还是push?*/) => {
    if (replace) {
      history.pushState({}, document.title, `${document.location.pathname}${location}${document.location.hash}`);
    } else {
      history.replaceState({}, document.title, `${document.location.pathname}${location}${document.location.hash}`);
    }
  },
  /** 渲染器解析实现 */
  // rendererResolver:(path, schema, props) => {},
  /** 用来决定弹框容器 */
  // getModalContainer:() => {},
  /** 用于懒加载自定义组件 */
  // loadRenderer:(schema, path, reRender) => {},
  /** 固顶间距，当你的有其他固顶元素时，需要设置一定的偏移量，否则会重叠 */
  // affixOffsetTop: 0,
  /** 固底间距，当你的有其他固底元素时，需要设置一定的偏移量，否则会重叠 */
  // affixOffsetBottom: 0,
  /** 内置 rich-text 为 frolaEditor，想要使用，请自行购买，或者用免费的 Tinymce，不设置 token 默认就是 Tinymce */
  // richTextToken: undefined,
};

export { amisRenderOptions };
