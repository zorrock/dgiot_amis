import { SchemaObject } from "amis";

const schema: SchemaObject = {
  type: "page",
  title: "简单表单",
  // @ts-ignore
  body: [
    {
      "type": "form", "api": "/api/mock2/form/saveForm?waitSeconds=2", "title": "常规模式", "mode": "horizontal",
      horizontal: {leftFixed: "sm"},
      "controls": [
        {"type": "email", "name": "email1", "required": true, "placeholder": "请输入邮箱", "label": "邮箱", "size": "xs"},
        {"type": "email", "name": "email2", "required": true, "placeholder": "请输入邮箱", "label": "邮箱", "size": "sm"},
        {"type": "email", "name": "email3", "required": true, "placeholder": "请输入邮箱", "label": "邮箱", "size": "md"},
        {"type": "email", "name": "email4", "required": true, "placeholder": "请输入邮箱", "label": "邮箱", "size": "lg"},
        {"type": "email", "name": "email5", "required": true, "placeholder": "请输入邮箱", "label": "邮箱", "size": "full"},
        {"type": "password", "name": "password", "label": "密码", "required": true, "placeholder": "请输入密码", "size": "md"},
        {"type": "checkbox", "name": "rememberMe", "label": "记住登录"},
        {"type": "submit", "label": "登录"}
      ],
    },
    {type: "divider"},

    {
      "type": "form", "api": "/api/mock2/form/saveForm?waitSeconds=2", "title": "内联模式", "mode": "inline", "autoFocus": false,
      "controls": [
        {"type": "email", "name": "email", "placeholder": "Enter Email", "label": "邮箱", "size": "auto"},
        {"type": "password", "name": "password", "placeholder": "密码", "size": "auto", "remark": "Bla bla bla"},
        {"type": "checkbox", "name": "rememberMe", "label": "记住登录", "size": "auto"},
        {"type": "submit", "label": "登录"},
        {"type": "button", "label": "导出", "url": "http://www.baidu.com/", "level": "success"},
      ]
    },
    {type: "divider"},

    {
      "type": "form", "api": "/api/mock2/form/saveForm?waitSeconds=2", "title": "常规模式下用数组包起来还能控制一行显示多个", "mode": "normal", "autoFocus": false,
      "controls": [
        {"type": "text", "name": "name", "placeholder": "请输入...", "label": "名字", "size": "full"},
        {
          "type": "group",
          "controls": [
            {"type": "email", "name": "email", "placeholder": "输入邮箱", "label": "邮箱", "size": "full"},
            {"type": "password", "name": "password", "label": "密码", "placeholder": "请输入密码", "size": "full"},
          ]
        },
        {
          "type": "group",
          "controls": [
            {"type": "email", "name": "email2", "mode": "inline", "placeholder": "请输入邮箱地址", "label": "邮箱", "size": "full"},
            {"type": "password", "name": "password2", "label": "密码", "mode": "inline", "placeholder": "请输入密码", "size": "full"},
          ]
        },
        {
          "type": "group",
          "controls": [
            {"type": "email", "name": "email3", "mode": "inline", "placeholder": "请输入邮箱地址", "label": "邮箱", "size": "full", "columnClassName": "v-bottom"},
            {"type": "password", "name": "password3", "label": "密码", "placeholder": "请输入密码", "size": "full"},
          ]
        },
        {
          "type": "group",
          "controls": [
            {"type": "email", "name": "email4", "placeholder": "请输入邮箱地址", "label": "邮箱", "size": "full"},
            {"type": "password", "name": "password4", "label": "密码", "placeholder": "请输入密码", "mode": "inline", "size": "full", "columnClassName": "v-bottom"}
          ]
        },
        {"type": "checkbox", "name": "rememberMe", "label": "记住我"},
        {"type": "submit", "label": "提交"}
      ]
    },
    {type: "divider"},

    {
      "type": "form", "api": "/api/mock2/form/saveForm?waitSeconds=2", "title": "水平模式用数组包起来也能控制一行显示多个", "mode": "horizontal", "autoFocus": false,
      "controls": [
        {"type": "email", "name": "email", "placeholder": "请输入邮箱地址", "label": "邮箱", "size": "full"},
        {
          "type": "group",
          "controls": [
            {"type": "email", "name": "email2", "placeholder": "请输入邮箱地址", "label": "邮箱", "size": "full"},
            {"type": "password", "name": "password2", "label": "密码", "placeholder": "请输入密码", "size": "full"}
          ]
        },
        {
          "type": "group",
          "controls": [
            {"type": "email", "name": "email3", "placeholder": "请输入邮箱地址", "label": "邮箱", "size": "full"},
            {"type": "password", "name": "password3", "label": "密码", "placeholder": "请输入密码", "size": "full"},
            {"type": "password", "name": "password3", "label": "密码", "placeholder": "请输入密码", "size": "full"}
          ]
        },
        {
          "type": "group",
          "controls": [
            {
              "type": "email", "name": "email4", "placeholder": "请输入邮箱地址", "label": "邮箱!!", "size": "full", "columnClassName": "col-sm-6",
              "horizontal": {"left": "col-sm-4", "right": "col-sm-8"}
            },
            {"type": "password", "name": "password4", "label": "密码", "placeholder": "请输入密码", "mode": "inline", "size": "full"}
          ]
        },
        {
          "type": "group", "label": "邮箱", "gap": "xs",
          "controls": [
            {"label": false, "type": "email", "name": "email5", "placeholder": "请输入邮箱地址", "size": "full"},
            {"type": "password", "name": "password5", "label": "密码", "placeholder": "请输入密码", "mode": "inline", "size": "full"}
          ]
        },
        {
          "type": "group", "label": "邮箱", "description": "bla bla", "gap": "xs",
          "controls": [
            {"type": "email", "name": "email6", "placeholder": "请输入邮箱地址", "mode": "inline"},
            {"type": "password", "name": "password6", "placeholder": "请输入密码", "labelClassName": "w-auto p-r-none", "mode": "inline"}
          ]
        },
        {
          "type": "group", "label": "邮箱", "description": "bla bla", "direction": "vertical",
          "controls": [
            {"type": "email", "name": "email9", "mode": "normal", "placeholder": "请输入邮箱地址", "inline": true, "description": "Bla blamfejkf fdjk"},
            {"type": "password", "name": "password9", "mode": "normal", "placeholder": "请输入密码", "labelClassName": "w-auto p-r-none"}
          ]
        },
        {"type": "checkbox", "name": "rememberMe", "label": "记住我"},
        {"type": "submit", "label": "Submit"}
      ]
    },
    {type: "divider"},

    {type: "divider"},

    {type: "divider"},

    {type: "divider"},

    {type: "divider"},
  ],
}

export { schema };
