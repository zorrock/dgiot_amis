const schema = {
  "type": "page",
  "body": [
    {
      "type": "form",
      "title": "过滤条件",
      "target": "chart1,chart2",
      "submitOnInit": true,
      "className": "m-b",
      "wrapWithPanel": false,
      "mode": "inline",
      "controls": [
        {
          "type": "date",
          "label": "开始日期",
          "name": "starttime",
          "value": "-8days",
          "maxDate": "${endtime}"
        },
        {
          "type": "date",
          "label": "结束日期",
          "name": "endtime",
          "value": "-1days",
          "minDate": "${starttime}"
        },
        {
          "type": "text",
          "label": "条件",
          "name": "name",
          "addOn": {
            "type": "submit",
            "label": "搜索",
            "level": "primary"
          }
        }
      ],
      "actions": []
    },
    {
      "type": "divider"
    },
    {
      "type": "grid",
      "className": "m-t-lg",
      "columns": [
        {
          "type": "chart",
          "name": "chart1",
          "initFetch": false,
          "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/chart/chart?name=$name&starttime=${starttime}&endtime=${endtime}"
        },
        {
          "type": "chart",
          "name": "chart2",
          "initFetch": false,
          "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/chart/chart2?name=$name"
        }
      ]
    }
  ]
};

export { schema }
