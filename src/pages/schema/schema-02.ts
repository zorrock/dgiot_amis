import { SchemaObject } from "amis";

const schema: SchemaObject = {
  type: "page",
  title: "增删改查示例",
  remark: "示例，啦啦啦啦啦",
  toolbar: [
    {
      type: "button", actionType: "dialog", label: "新增", icon: "fa fa-plus pull-left", level: "primary",
      dialog: {
        title: "新增",
        body: {
          type: "form", name: "sample-edit-form", api: "post:/api/sample",
          controls: [
            {type: "text", name: "engine", label: "Engine", required: true},
            {type: "divider"},
            {type: "text", name: "browser", label: "Browser", required: true},
            {type: "text", name: "platform", label: "Platform(s)", required: true},
            {type: "text", name: "version", label: "Engine version", required: true},
            {type: "text", name: "grade", label: "CSS grade", required: true},
          ]
        },
      },
    },
  ],
  body: {
    type: "crud", draggable: true, api: "get:/api/sample?waitSeconds=1", keepItemSelectionOnPageChange: true, labelTpl: "${id} ${engine}",
    quickSaveApi: "/api/sample/bulkUpdate",
    quickSaveItemApi: "/api/sample/$id",
    filterTogglable: true,
    filter: {
      title: "条件搜索", submitText: "", controls: [
        {type: "text", name: "keywords", placeholder: "通过关键字搜索", addOn: {label: "搜索", type: "submit"}},
        {type: "plain", text: "这里的表单项可以配置多个"}
      ],
    },
    bulkActions: [],
    "columns": [
      {
        "name": "id",
        "label": "ID",
        "width": 20,
        "sortable": true,
        "type": "text",
        "toggled": true,
        "remark": "Bla bla Bla"
      },
      {
        "name": "engine",
        "label": "Rendering engine",
        "sortable": true,
        "searchable": true,
        "type": "text",
        "toggled": true
      },
      {
        "name": "browser",
        "label": "Browser",
        "sortable": true,
        "type": "text",
        "toggled": false
      },
      {
        "name": "platform",
        "label": "Platform(s)",
        "popOver": {
          "body": "Popover 内容：${platform}"
        },
        "sortable": true,
        "type": "text",
        "toggled": true
      },
      {
        "name": "version",
        "label": "Engine version",
        "quickEdit": true,
        "type": "text",
        "toggled": true,
        "filterable": {
          "options": [
            {
              "label": "4",
              "value": "4"
            },
            {
              "label": "5",
              "value": "5"
            },
            {
              "label": "6",
              "value": "6"
            }
          ]
        }
      },
      {
        "type": "text",
        "name": "grade",
        "label": "CSS grade",
        "quickEdit": {
          "saveImmediately": true,
          "mode": "inline",
          "type": "select",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "X"
          ]
        }
      },
      {
        "type": "operation",
        "label": "操作",
        "width": 100,
        "buttons": [
          {
            "type": "button",
            "icon": "fa fa-eye",
            "actionType": "dialog",
            "tooltip": "查看",
            "dialog": {
              "title": "查看",
              "body": {
                "type": "form",
                "controls": [
                  {
                    "type": "static",
                    "name": "engine",
                    "label": "Engine"
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "static",
                    "name": "browser",
                    "label": "Browser"
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "static",
                    "name": "platform",
                    "label": "Platform(s)"
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "static",
                    "name": "version",
                    "label": "Engine version"
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "static",
                    "name": "grade",
                    "label": "CSS grade"
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "html",
                    "html": "<p>添加其他 <span>Html 片段</span> 需要支持变量替换（todo）.</p>"
                  }
                ]
              }
            }
          },
          {
            "type": "button",
            "icon": "fa fa-pencil",
            "tooltip": "编辑",
            "actionType": "drawer",
            "drawer": {
              "position": "left",
              "size": "lg",
              "title": "编辑",
              "body": {
                "type": "form",
                "name": "sample-edit-form",
                "api": "https://houtai.baidu.com/api/sample/$id",
                "controls": [
                  {
                    "type": "text",
                    "name": "engine",
                    "label": "Engine",
                    "required": true
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "text",
                    "name": "browser",
                    "label": "Browser",
                    "required": true
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "text",
                    "name": "platform",
                    "label": "Platform(s)",
                    "required": true
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "text",
                    "name": "version",
                    "label": "Engine version"
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "select",
                    "name": "grade",
                    "label": "CSS grade",
                    "options": [
                      "A",
                      "B",
                      "C",
                      "D",
                      "X"
                    ]
                  }
                ]
              }
            }
          },
          {
            "type": "button",
            "icon": "fa fa-times text-danger",
            "actionType": "ajax",
            "tooltip": "删除",
            "confirmText": "您确认要删除?",
            "api": "delete:https://houtai.baidu.com/api/sample/$id"
          }
        ],
        "toggled": true
      }
    ]
  },
}

export { schema };
