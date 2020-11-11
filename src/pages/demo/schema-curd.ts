import { PageSchema } from "amis";

const schema: PageSchema = {
  type: "page",
  // title: "增删查改示例",
  toolbar: [],
  body: [
    {
      type: "crud", defaultParams: {pageNo: 1, pageSize: 20,}, pageField: "pageNo", perPageField: "pageSize", primaryField: "orderId", affixHeader: false,
      // 接口定义
      api: {method: "get", url: "/!/mvc/05CURD@t04"},
      // 条件过滤表单
      filter: {
        title: "", submitText: "", trimValues: true, // submitOnChange: true,
        controls: [
          {type: "text", label: "订单编号", name: "orderCode", placeholder: "通过关键字搜索", clearable: true, size: "md"},
          {type: "text", label: "手机号", name: "shipMobile", placeholder: "通过关键字搜索", clearable: true, size: "md"},
          {
            type: "select", label: "订单状态", name: "status", placeholder: "通过关键字搜索", clearable: true, size: "md",
            options: [{label: "已出库", value: "1"}, {label: "已签收", value: "2"}, {label: "已驳回", value: "3"}],
          },
        ],
      },
      // 列定义
      columns: [
        {name: "orderId", label: "订单ID", sortable: true},
        {name: "orderCode", label: "订单编号", sortable: true},
        {
          name: "status", label: "订单状态", sortable: true, type: "mapping",
          map: {"-3": "待审核", "-2": "待支付", "-1": "待处理", "0": "已接单", "1": "已出库", "2": "已签收", "3": "已驳回", "4": "拒收", "5": "已取消"}
        },
        {name: "shipName", label: "收货人姓名", sortable: true},
        {name: "shipMobile", label: "手机号", sortable: true},
        {name: "orderType", label: "订单类型", sortable: true, type: "mapping", map: {"1": "O2O", "2": "B2C"}},
        {
          name: "payType", label: "支付方式", sortable: true, type: "mapping",
          map: {"-1": "暂无", "0": "现金支付", "1": "微信支付", "2": "支付宝", "3": "三方平台线上支付", "4": "小程序", "5": "保险支付", "45": "微信小程序+保险"}
        },
        {name: "payStatus", label: "支付状态", sortable: true, type: "mapping", map: {"1": "未支付", "2": "已支付"}},
        {name: "payTime", label: "支付时间", sortable: true},
        {name: "payAmount", label: "支付金额", sortable: true},
        {name: "createAt", label: "下单时间", sortable: true},
        {
          type: "operation", label: "操作", width: 120, toggled: true,
          buttons: [
            {
              type: "button", label: "查看", level: "info", size: "xs", actionType: "dialog",
              dialog: {
                title: "查看订单 - ${orderId}", actions: [{type: "button", label: "关闭", level: "primary", actionType: "close"}],
                body: {
                  type: "form",
                  controls: [
                    {type: "static", name: "orderId", label: "订单ID"},
                    {type: "static", name: "orderCode", label: "订单编号"},
                    {
                      type: "mapping", name: "status", label: "订单状态",
                      map: {"-3": "待审核", "-2": "待支付", "-1": "待处理", "0": "已接单", "1": "已出库", "2": "已签收", "3": "已驳回", "4": "拒收", "5": "已取消"}
                    },
                    {type: "static", name: "shipName", label: "收货人"},
                    {type: "static", name: "shipMobile", label: "手机号"},
                    {type: "static", name: "shipAddr", label: "地址"},
                  ]
                }
              }
            },
            {
              type: "button", label: "编辑", level: "info", size: "xs", actionType: "dialog", // level: "link",
              dialog: {
                position: "left", size: "md", title: "编辑",
                body: {
                  type: "form", name: "sample-edit-form", api: "get:/!/mvc/01MvcBase@t01?id=$id",
                  controls: [
                    {type: "text", name: "orderId", label: "订单ID"},
                    {type: "text", name: "orderCode", label: "订单编号"},
                    {type: "select", name: "status", label: "订单状态", options: [{label: "已出库", value: "1"}, {label: "已签收", value: "2"}, {label: "已驳回", value: "3"}]},
                    {type: "text", name: "shipName", label: "收货人"},
                    {type: "text", name: "shipMobile", label: "手机号"},
                    {type: "text", name: "shipAddr", label: "地址"},
                  ]
                }
              }
            },
            {type: "button", label: "删除", level: "danger", size: "xs", actionType: "ajax", confirmText: "您确认要删除订单:${orderId}?", api: "get:/!/mvc/01MvcBase@t01"}
          ],
        },
      ],
      perPageAvailable: [10, 20, 50, 100],
      // 表格顶部工具栏
      headerToolbar: [],
      // 表格页脚
      footerToolbar: ["statistics", "switch-per-page", "pagination"],
    },
  ],
};

export { schema }
