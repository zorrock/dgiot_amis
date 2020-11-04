import {
  AmisBaseSchema,
  AmisSchemaApi,
  AmisSchemaClassName,
  AmisSchemaCollection,
  AmisSchemaDefaultData,
  AmisSchemaExpression,
  AmisSchemaMessage,
  AmisSchemaName,
  AmisSchemaType
} from "@/amis-types/schema-type";
import { AmisRemarkSchema } from "@/amis-types/remark-schema";

/**
 * amis Page 渲染器。详情请见：https://baidu.gitee.io/amis/docs/components/page
 */
interface AmisPageSchema extends AmisBaseSchema {
  /**
   * 指定为 page 渲染器。
   */
  type: AmisSchemaType.Page;

  /**
   * 页面标题
   */
  title?: string;

  /**
   * 页面副标题
   */
  subTitle?: string;

  /**
   * 页面描述, 标题旁边会出现个小图标，放上去会显示这个属性配置的内容。
   */
  remark?: string | Omit<AmisRemarkSchema, 'type'>;

  /**
   * 内容区域
   */
  body?: AmisSchemaCollection;

  /**
   * 内容区 css 类名
   */
  bodyClassName?: AmisSchemaClassName;

  /**
   * 边栏区域
   */
  aside?: AmisSchemaCollection;

  /**
   * 边栏区 css 类名
   */
  asideClassName?: AmisSchemaClassName;

  /**
   * 配置容器 className
   */
  className?: AmisSchemaClassName;

  data?: AmisSchemaDefaultData;

  /**
   * 配置 header 容器 className
   */
  headerClassName?: AmisSchemaClassName;

  /**
   * 页面初始化的时候，可以设置一个 API 让其取拉取，发送数据会携带当前 data 数据（包含地址栏参数），获取得数据会合并到 data 中，供组件内使用。
   */
  initApi?: AmisSchemaApi;

  /**
   * 是否默认就拉取？
   */
  initFetch?: boolean;

  /**
   * 是否默认就拉取表达式
   */
  initFetchOn?: AmisSchemaExpression;

  messages?: AmisSchemaMessage;

  name?: AmisSchemaName;

  /**
   * 页面顶部区域，当存在 title 时在右上角显示。
   */
  toolbar?: AmisSchemaCollection;

  /**
   * 配置 toolbar 容器 className
   */
  toolbarClassName?: AmisSchemaClassName;

  definitions?: any;

  /**
   * 配置轮询间隔，配置后 initApi 将轮询加载。
   */
  interval?: number;

  /**
   * 是否要静默加载，也就是说不显示进度
   */
  silentPolling?: boolean;

  /**
   * 配置停止轮询的条件。
   */
  stopAutoRefreshWhen?: AmisSchemaExpression;

  /**
   * 是否显示错误信息，默认是显示的。
   */
  showErrorMsg?: boolean;
}

export { AmisPageSchema };
