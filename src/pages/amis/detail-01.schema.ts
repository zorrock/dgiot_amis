import { serverHost } from "@/api/server-api";
import { enum2object } from "@/utils/enum";
import { statusMapper } from "@/pages/amis/enum-data";
import classnames from "classnames";
import { FormClassName } from "@/amis-types";

const amisPageName = "detail";

const schema = {
  type: "page",
  name: "page",
  title: "",
  toolbar: [],
  body: [
    {
      type: "form",
      name: "form",
      wrapWithPanel: false,
      mode: "inline",
      className: classnames(FormClassName.label4x),
      debug: true,
      // data: {
      //   orderId: "1021652540551041025"
      // },
      initApi: {
        method: "get",
        url: `${serverHost}/!/amis-api/curd-page@getDetail?orderId=$orderId`,
        // url: `${serverHost}/!/amis-api/curd-page@getDetail?orderId`,
        // data: {
        //   orderId: window[amisPageName]?.orderId ?? "1021652540551041025"
        // }
      },
      controls: [
        { type: "static", name: "orderId", label: "订单ID" },
        { type: "html", html: "<br />" },
        { type: "static", name: "orderCode", label: "订单编号" },
        { type: "html", html: "<br />" },
        { type: "mapping", name: "status", label: "订单状态", map: enum2object(statusMapper) },
        { type: "html", html: "<br />" },
        { type: "static", name: "shipName", label: "收货人" },
        { type: "html", html: "<br />" },
        { type: "static", name: "shipMobile", label: "手机号" },
        { type: "html", html: "<br />" },
        { type: "static", name: "shipAddr", label: "地址" },
        { type: "html", html: "<br />" },
        { type: "static", name: "time", label: "时间" },
      ]
    }
  ],
};

export { schema, amisPageName }
