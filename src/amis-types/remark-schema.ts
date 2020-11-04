import { AmisBaseSchema, AmisSchemaIcon, AmisSchemaTpl, AmisSchemaType } from "@/amis-types/schema-type";

/**
 * 提示渲染器，默认会显示个小图标，鼠标放上来的时候显示配置的内容。
 */
interface AmisRemarkSchema extends AmisBaseSchema {
  /**
   * 指定为提示类型
   */
  type: AmisSchemaType.Remark;

  icon?: AmisSchemaIcon;

  /**
   * 触发规则
   */
  trigger?: Array<'click' | 'hover' | 'focus'>;

  /**
   * 提示标题
   */
  title?: string;

  /**
   * 提示内容
   */
  content: AmisSchemaTpl;

  /**
   * 显示位置
   */
  placement?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * 点击其他内容时是否关闭弹框信息
   */
  rootClose?: boolean;
}

export { AmisRemarkSchema };
