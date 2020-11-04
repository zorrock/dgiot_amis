import { AmisSchema, AmisSchemaType } from "@/amis-types";

const schema: AmisSchema = {
  type: AmisSchemaType.Page,
  title: "表单页面",
  body: [
    {
      type: AmisSchemaType.Form,
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

const test = (ss: string) => {
  console.log("test@@@@@@@@@@@@@@@@@@@@@@@@@@@", ss);
}

export { schema, test };
