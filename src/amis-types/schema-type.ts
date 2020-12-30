// enum AmisSchemaType {
//   // ------------------------------------------------------------------------------------------------ 通用
//   /** Page 页面 */
//   Page = "page",
//   /** Tpl 模板 */
//   Tpl = "tpl",
//   /** Html文本 */
//   Html = "html",
//   /** Button 按钮 */
//   Button = "button",
//   /** ButtonGroup 按钮组 */
//   ButtonGroup = "button-group",
//   /** Button-Toolbar 按钮工具栏 */
//   ButtonToolbar = "button-toolbar",
//   /** Icon 图标 */
//   Icon = "icon",
//   /** Link 链接 */
//   Link = "link",
//   // ------------------------------------------------------------------------------------------------ 布局
//   /** Container 容器 */
//   Container = "container",
//   /** Divider 分割线 */
//   Divider = "divider",
//   /** Grid 网格布局 */
//   Grid = "grid",
//   /** HBox 布局 */
//   HBox = "hbox",
//   /** Panel 面板 */
//   Panel = "panel",
//   /** Tabs 选项卡 */
//   Tabs = "tabs",
//   /** Wrapper 包裹容器 */
//   Wrapper = "wrapper",
//   // ------------------------------------------------------------------------------------------------ 导航
//   /** DropDownButton 下拉按钮/菜单 */
//   DropDownButton = "dropdown-button",
//   /** Nav 导航 */
//   Nav = "nav",
//   /** Wizard 向导 */
//   Wizard = "wizard",
//   // ------------------------------------------------------------------------------------------------ 数据录入
//   /** Form 表单 */
//   Form = "form",
//   /** Text 输入框 */
//   Text = "text",
//   /** Date 日期时间 */
//   Date = "date",
//   /** Datetime 日期时间 */
//   Datetime = "datetime",
//   /** Time 时间 */
//   Time = "time",
//   /** Switch 开关 */
//   Switch = "switch",
//   /** List 列表 */
//   List = "list",
//   /** Image 图片 */
//   Image = "image",
//   /** Images 图片集 */
//   Images = "images",
//   /** JSON 展示组件 */
//   Json = "json",
//   /** Table 表格 */
//   Table = "table",
//   // ------------------------------------------------------------------------------------------------ 数据展示
//   /** Date 在 Form 中用作静态展示，为"static-date" */
//   StaticDate = "static-date",
//   /** Datetime 在 Form 中用作静态展示，为"static-datetime" */
//   StaticDatetime = "static-datetime",
//   /** Time 在 Form 中用作静态展示，为"static-time" */
//   StaticTime = "static-time",
//   /** Image 在 Form 中用作静态展示，为"static-color" */
//   StaticImage = "static-image",
//   /** Images 在 Form 中用作静态展示，为"static-images" */
//   StaticImages = "static-images",
//   /** Json 在 Form 中用作静态展示，为"static-json" */
//   StaticJson = "static-json",
//   /** Link 在 Form 中用作静态展示，为"static-link" */
//   StaticList = "static-list",
//   /** Table 在 Form 中用作静态展示，为"static-table" */
//   StaticTable = "static-table",
//   /** Tasks 任务操作集合 */
//   Tasks = "tasks",
//   /** Card 卡片 */
//   Card = "card",
//   /** Cards 卡片组 */
//   Cards = "cards",
//   /** Carousel 轮播图 */
//   Carousel = "carousel",
//   /** Chart 图表 */
//   Chart = "chart",
//   /** Collapse 折叠器 */
//   Collapse = "collapse",
//   /** Remark 标记 */
//   Remark = "remark",
//   /** Color 颜色 */
//   Color = "color",
//   /** QRCode 二维码 */
//   QRCode = "qrcode",
//   // ------------------------------------------------------------------------------------------------ 反馈
//   /** Alert 提示 */
//   Alert = "alert",
//   /** Dialog 对话框 */
//   Dialog = "dialog",
//   /** Drawer 抽屉 */
//   Drawer = "drawer",
//   /** Status 状态 */
//   Status = "status",
//   /** Progress 进度条 */
//   Progress = "progress",
//   // ------------------------------------------------------------------------------------------------ 数据相关
//   /** Each 循环渲染器 */
//   Each = "each",
//   /** Mapping 映射 */
//   Mapping = "mapping",
//   /** Service 功能型容器 */
//   Service = "service",
//   // ------------------------------------------------------------------------------------------------ 其他
//   /** IFrame 内嵌页 */
//   IFrame = "iframe",
//   /** CRUD 增删改查 */
//   CRUD = "crud",
//   /** Audio 音频 */
//   Audio = "audio",
//   /** Video 视频 */
//   Video = "video",
//
//   /** TODO */
//   Submit = "submit",
//   /** TODO */
//   Reset = "reset",
//   /**  TODO */
//   Map = "map",
//   /** TODO */
//   Operation = "operation",
//   /** TODO */
//   Plain = "plain",
//   /** TODO */
//   QrCode = "qr-code",
//   /** TODO */
//   VBox = "vbox",
//   // /**  */
//   // aaa = "aaa",
// }
//
// /**
//  * 表达式，语法 `data.xxx > 5`。
//  */
// type AmisSchemaExpression = string;
//
// /**
//  * css类名，字符串格式
//  */
// type AmisSchemaClassName = string;
//
// /**
//  * 组件名字，这个名字可以用来定位，用于组件通信
//  */
// declare type AmisSchemaName = string;
//
// /**
//  * Schema基础属性
//  */
// interface AmisBaseSchema {
//   /** 组件(渲染器)类型 */
//   type: AmisSchemaType;
//
//   /**
//    * 容器 css 类名
//    */
//   className?: AmisSchemaClassName;
//
//   /**
//    * 配合 definitions 一起使用，可以实现无限循环的渲染器。
//    */
//   $ref?: string;
//
//   /**
//    * 是否禁用
//    */
//   disabled?: boolean;
//
//   /**
//    * 是否禁用表达式
//    */
//   disabledOn?: AmisSchemaExpression;
//
//   /**
//    * 是否隐藏
//    * @deprecated 推荐用 visible
//    */
//   hidden?: boolean;
//
//   /**
//    * 是否隐藏表达式
//    * @deprecated 推荐用 visibleOn
//    */
//   hiddenOn?: AmisSchemaExpression;
//
//   /**
//    * 是否显示
//    */
//   visible?: boolean;
//
//   /**
//    * 是否显示表达式
//    */
//   visibleOn?: AmisSchemaExpression;
// }
//
// /**
//  * 消息文案配置，记住这个优先级是最低的，如果你的接口返回了 msg，接口返回的优先。
//  */
// type AmisSchemaMessage = {
//   /**
//    * 获取失败时的提示
//    */
//   fetchFailed?: string;
//   /**
//    * 获取成功的提示，默认为空。
//    */
//   fetchSuccess?: string;
//   /**
//    * 保存失败时的提示。
//    */
//   saveFailed?: string;
//   /**
//    * 保存成功时的提示。
//    */
//   saveSuccess?: string;
// };
//
// export type AmisSchemaUrlPath = string;
//
// interface SchemaApiObject {
//   /**
//    * API 发送类型
//    */
//   method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
//   /**
//    * API 发送目标地址
//    */
//   url: AmisSchemaUrlPath;
//   /**
//    * 用来控制携带数据. 当key 为 `&` 值为 `$$` 时, 将所有原始数据打平设置到 data 中. 当值为 $$ 将所有原始数据赋值到对应的 key 中. 当值为 $ 打头时, 将变量值设置到 key 中.
//    */
//   data?: {
//     [propName: string]: any;
//   };
//   /**
//    * 发送体的格式
//    */
//   dataType?: 'json' | 'form-data' | 'form';
//   /**
//    * 如果是文件下载接口，请配置这个。
//    */
//   responseType?: 'blob';
//   /**
//    * 携带 headers，用法和 data 一样，可以用变量。
//    */
//   headers?: {
//     [propName: string]: string;
//   };
//   /**
//    * 设置发送条件
//    */
//   sendOn?: AmisSchemaExpression;
//   /**
//    * 默认都是追加模式，如果想完全替换把这个配置成 true
//    */
//   replaceData?: boolean;
//   /**
//    * 是否自动刷新，当 url 中的取值结果变化时，自动刷新数据。
//    */
//   autoRefresh?: boolean;
//   /**
//    * 如果设置了值，同一个接口，相同参数，指定的时间（单位：ms）内请求将直接走缓存。
//    */
//   cache?: number;
//   /**
//    * qs 配置项
//    */
//   qsOptions?: {
//     arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
//     indices?: boolean;
//     allowDots?: boolean;
//   };
// }
//
// /**
//  * API描述
//  */
// type AmisSchemaApi = string | SchemaApiObject;
//
// /**
//  * 初始数据，设置得值可用于组件内部模板使用。
//  */
// type AmisSchemaDefaultData = {
//   [propName: string]: any;
// };
//
// // TODO SchemaNod
// type AmisSchemaCollection = undefined; // SchemaObject | SchemaTpl | Array<SchemaObject | SchemaTpl>;
//
// /**
//  * iconfont 里面的类名。
//  */
// type AmisSchemaIcon = string;
//
// /**
//  * 支持两种语法，但是不能混着用。分别是：
//  *
//  * 1. `${xxx}` 或者 `${xxx|upperCase}`
//  * 2. `<%= data.xxx %>`
//  *
//  *
//  * 更多文档：https://baidu.gitee.io/amis/docs/concepts/template
//  */
// type AmisSchemaTpl = string;
//
// export {
//   AmisSchemaType,
//   AmisSchemaExpression,
//   AmisSchemaClassName,
//   AmisSchemaName,
//   AmisBaseSchema,
//   AmisSchemaMessage,
//   AmisSchemaApi,
//   AmisSchemaDefaultData,
//   AmisSchemaCollection,
//   AmisSchemaIcon,
//   AmisSchemaTpl,
// }
