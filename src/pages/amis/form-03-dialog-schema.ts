import classnames from "classnames";
import { DialogClassName, FormClassName, GeneralClassName, HeightClassName, WidthClassName } from "@/amis-types";
import { payStatusMapper, payTypeMapper, statusMapper } from "./enum-data";
import { enum2object } from "@/utils/enum";
import { serverHost } from "@/server-api";
import styles from "./form-03-dialog-schema.less";

const schema = {
  type: "page",
  title: "对话框表单",
  toolbar: [],
  body: [
    // --------------------------------------------------------------- 简单对话框表单
    {
      type: "button",
      label: "简单对话框表单",
      actionType: "dialog",
      dialog: {
        // size: "md",
        title: "简单对话框表单",
        closeOnEsc: true,
        body: {
          type: "form",
          mode: "horizontal",
          className: classnames(FormClassName.flex_label6x),
          controls: [
            {
              type: "picker", name: "f0", label: "对话框选择", size: "lg",
              source: {
                method: "get",
                url: `${serverHost}/!/amis-api/curd-page@curdQuery`,
              },
              multiple: true, valueField: "orderId", labelField: "orderCode", pickerSchema: getPickerSchema(),
            },
            {type: "text", name: "f1", label: "简单文本"},
            {type: "textarea", name: "f2", label: "多行文本"},
            {type: "number", name: "f3", label: "数字"},
            {type: "checkboxes", name: "f4", label: "多选组", columnsCount: 3, options: statusMapper},
            {type: "datetime", name: "f5", label: "日期时间"},
          ],
          api: {
            method: "post",
            url: `${serverHost}/!/amis-api/curd-page@mockSubmit`,
          },
        },
      },
    },
    {type: "html", html: "<span></span>", className: classnames(WidthClassName.width1x, GeneralClassName.Inline_Block)},
    // --------------------------------------------------------------- 对话框表单布局
    {
      type: "button",
      label: "对话框表单布局",
      actionType: "dialog",
      dialog: {
        title: "对话框表单布局",
        closeOnEsc: true,
        className: classnames(DialogClassName.width35x),
        body: {
          type: "form",
          mode: "inline",
          className: classnames(FormClassName.label6x, FormClassName.input18x, FormClassName.item_height3_5x),
          controls: [
            {type: "text", name: "f1", label: "供应商名称", required: false, placeholder: "请输入", clearable: true},
            {type: "html", html: "<br />"},
            {type: "text", name: "f3", label: "联系人", required: false, placeholder: "请输入", clearable: true},
            {type: "html", html: "<br />"},
            {type: "text", name: "f4", label: "联系人手机号", required: false, placeholder: "请输入", clearable: true},
            {type: "html", html: "<br />"},
            {type: "text", name: "f5", label: "供货范围", required: false, placeholder: "请输入", clearable: true},
            {type: "button", label: "查看供货公司"},
          ],
          api: {
            method: "post",
            url: `${serverHost}/!/amis-api/curd-page@mockSubmit`,
          },
        },
      },
    },
    {type: "html", html: "<span></span>", className: classnames(WidthClassName.width1x, GeneralClassName.Inline_Block)},
    // --------------------------------------------------------------- 对话框表单分组
    {
      type: "button",
      label: "对话框表单分组",
      actionType: "dialog",
      dialog: {
        title: "对话框表单分组",
        closeOnEsc: true,
        className: classnames(DialogClassName.width55x),
        body: {
          type: "form",
          controls: [
            {
              type: "fieldSet",
              title: "供应商注册信息",
              collapsable: false,
              mode: "inline",
              className: classnames(FormClassName.label6x, FormClassName.input18x, FormClassName.item_height2_5x),
              controls: [
                {type: "text", name: "f1", label: "供应商名称", required: false, placeholder: "请输入", clearable: true},
                {type: "html", html: "<br />"},
                {type: "password", name: "f2", label: "登录账号", required: false, placeholder: "请输入", clearable: true},
                {type: "html", html: "<br />"},
                {type: "password", name: "f3", label: "联系人", required: false, placeholder: "请输入", clearable: true},
                {type: "html", html: "<br />"},
                {type: "text", name: "f4", label: "联系人手机号", required: false, placeholder: "请输入", clearable: true},
                {type: "html", html: "<br />"},
                {type: "text", name: "f5", label: "供货范围", required: false, placeholder: "请输入", clearable: true},
                {type: "button", label: "查看供货公司"},
              ],
            },
            {
              type: "fieldSet",
              title: "关联ERP供应商",
              collapsable: true,
              mode: "inline",
              className: classnames(FormClassName.label4x, FormClassName.input20x),
              controls: [
                {type: "text", name: "f6", label: "供货范围", required: false, placeholder: "请输入", clearable: true},
                {type: "html", html: "<br />"},
                {type: "button", actionType: "dialog", label: "添加供应商", icon: "fa fa-plus"},
                {type: "button", actionType: "dialog", label: "删除", icon: "fa fa-times"},
                {type: "html", html: "<br />"},
                {
                  type: "table",
                  name: "f7",
                  className: classnames(styles.formItemValueFull, HeightClassName.height_unset),
                  inputClassName: classnames(WidthClassName.width_full),
                  // addable: true,
                  // removable: true,
                  columns: [
                    {name: "t1", label: "供应商编码"},
                    {name: "t2", label: "供应商名称"},
                    {name: "t3", label: "采购员"},
                    {name: "t4", label: "业务联系人"},
                  ],
                },
              ],
            },
          ],
          api: {
            method: "post",
            url: `${serverHost}/!/amis-api/curd-page@mockSubmit`,
          },
        },
      },
    },
    {type: "html", html: "<span></span>", className: classnames(WidthClassName.width1x, GeneralClassName.Inline_Block)},
    // --------------------------------------------------------------- 对话框表单校验
    {
      type: "button",
      label: "对话框表单校验",
      actionType: "dialog",
      dialog: {
        title: "对话框表单校验",
        closeOnEsc: true,
        className: classnames(DialogClassName.width30x),
        body: {
          type: "form",
          mode: "inline",
          className: classnames(FormClassName.label6x, FormClassName.input18x, FormClassName.item_height3_5x),
          controls: [
            {type: "text", name: "f1", label: "随意填", placeholder: "随意填"},
            {type: "text", name: "f2-1", label: "非空字符", placeholder: "不能填空字符", required: true, validations: {notEmptyString: true}},
            {type: "text", name: "f3", label: "邮箱", placeholder: "必须是Email", required: true, validations: {isEmail: true}},
            {type: "text", name: "f9", label: "整数或小数", placeholder: "必须是整数或小数", required: true, validations: {isFloat: true}},
            {type: "text", name: "f11", label: "长度限制", placeholder: "长度在6~10", required: true, validations: {minLength: 6, maxLength: 10}},
          ],
          api: {
            method: "post",
            url: `${serverHost}/!/amis-api/curd-page@mockSubmit`,
          },
        },
      },
    },
    {type: "html", html: "<span></span>", className: classnames(WidthClassName.width1x, GeneralClassName.Inline_Block)},
    // --------------------------------------------------------------- 对话框表单校验(服务端校验)
    {
      type: "button",
      label: "对话框表单校验2",
      actionType: "dialog",
      dialog: {
        title: "对话框表单校验(服务端校验)",
        closeOnEsc: true,
        className: classnames(DialogClassName.width30x),
        body: {
          type: "form",
          mode: "inline",
          className: classnames(FormClassName.label4x, FormClassName.input22x, FormClassName.item_height3_5x),
          controls: [
            {type: "text", name: "f1", label: "随意填1", placeholder: "只能填“aaa”"},
            {type: "html", html: "<br />"},
            {type: "text", name: "f2", label: "随意填2", placeholder: "只能填“bbb”"},
            {type: "html", html: "<br />"},
            {type: "text", name: "f3", label: "随意填3", placeholder: "只能填“ccc”"},
            {type: "html", html: "<br />"},
          ],
          api: {
            method: "post",
            url: `${serverHost}/!/amis-api/curd-page@serverVerify`,
          },
        },
      },
    },
    {type: "html", html: "<span></span>", className: classnames(WidthClassName.width1x, GeneralClassName.Inline_Block)},
    // ---------------------------------------------------------------
  ],
};

function getPickerSchema() {
  return {
    mode: "table",
    name: "picker-table",
    // labelTpl: "${shipName} - ${shipMobile}",
    perPageAvailable: [10, 20, 50, 100],
    defaultParams: {pageNo: 1, pageSize: 10},
    pageField: "pageNo",
    perPageField: "pageSize",
    primaryField: "orderId",
    columns: [
      {name: "orderCode", label: "订单编号", sortable: true},
      {name: "status", label: "订单状态", sortable: true, type: "mapping", map: enum2object(statusMapper),},
      {name: "shipName", label: "收货人姓名", sortable: true},
      {name: "shipMobile", label: "手机号", sortable: true},
      {name: "payStatus", label: "支付方式", sortable: true, type: "mapping", map: enum2object(payTypeMapper)},
      {name: "payType", label: "支付状态", sortable: true, type: "mapping", map: enum2object(payStatusMapper)},
      {name: "payAmount", label: "支付金额", sortable: true},
      {name: "createAt", label: "下单时间", sortable: true},
    ],
    headerToolbar: [
      {
        type: "form",
        mode: "inline",
        target: "picker-table",
        wrapWithPanel: false,
        controls: [
          {
            type: "text", name: "orderCode", placeholder: "输入订单编号", inputClassName: WidthClassName.width24x,
            addOn: {type: "submit", label: "查询", level: "primary", icon: "fa fa-search pull-left"},
          },
        ]
      },
      {align: "right", type: "columns-toggler"},
    ],
    footerToolbar: [
      {align: "left", type: "statistics"},
      {align: "right", type: "pagination"},
      {align: "right", type: "switch-per-page"},
    ],
  };
}

export { schema }
