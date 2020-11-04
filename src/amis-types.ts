import {SchemaObject} from 'amis'

enum ComponentType {
  /** 页面 */
  page = "page",
  /** 表单 */
  form = "form",
}

interface AmisComponent {
}

interface Page extends AmisComponent {
  /** 组件类型 */
  type: ComponentType.page,
  /** 页面标题 */
  title: string,
  /** 页面内容 */
  body: string | Array<Schema> | Schema;
}

interface Form extends AmisComponent {
  /** 组件类型 */
  type: ComponentType.form,
  /** 表单布局模式 */
  mode: "horizontal";
  /** 表单提交api地址 */
  api: string;
  /** 表单项 */
  controls: Array<FormControl>;
}

interface FormControl {
  /** 表单项类型 */
  type: string;
  /** 表单项label */
  label: string;
  /** 表单项字段名 */
  name: string;
}

type Schema = Page | Form | SchemaObject;

export {
  ComponentType,
  Schema,
}
