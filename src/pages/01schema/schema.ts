import { ComponentType, Schema } from "@/amis-types";

const schema: Schema = {
  type: ComponentType.page,
  title: "表单页面",
  body: [
    {
      type: ComponentType.form,
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
}

export { schema };
