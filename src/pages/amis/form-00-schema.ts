import classnames from "classnames";
import { FormClassName } from "@/amis-types";

const schema = {
  type: "page",
  title: "简单的表单",
  toolbar: [],
  body: [
    // --------------------------------------------------------------- 常规表单
    {
      type: "form",
      title: "常规表单",
      mode: "horizontal",
      // submitText: "提交",
      className: classnames(FormClassName.flex_label6x, FormClassName.flex_input26x),
      controls: [
        {type: "text", name: "f1", label: "供应商名称", required: false, placeholder: "请输入"},
        {type: "text", name: "f2", label: "登录账号", required: false, placeholder: "请输入"},
        {type: "text", name: "f2", label: "联系人", required: false, placeholder: "请输入"},
        {type: "text", name: "f2", label: "联系人手机号", required: false, placeholder: "请输入"},
        {type: "text", name: "f2", label: "供货范围", required: false, placeholder: "请输入"},
        {type: "submit", label: "提交", level: "primary"},
      ],
      api: {},
    },
    {type: "divider"},
  ],
};

export { schema }

