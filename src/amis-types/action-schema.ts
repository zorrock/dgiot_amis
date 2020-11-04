// import {
//   AjaxActionSchema, ButtonSchema,
//   CopyActionSchema,
//   DialogActionSchema,
//   DrawerActionSchema,
//   LinkActionSchema,
//   OtherActionSchema,
//   ReloadActionSchema,
//   UrlActionSchema, VanillaAction
// } from "amis/src/renderers/Action";
// import { SchemaApi, SchemaReload } from "amis/src/Schema";
// import { DialogSchemaBase } from "amis/src/renderers/Dialog";
//
// interface AjaxActionSchema extends ButtonSchema {
//   /**
//    * 指定为发送 ajax 的行为。
//    */
//   actionType: 'ajax';
//
//   /**
//    * 配置 ajax 发送地址
//    */
//   api: SchemaApi;
//
//   feedback?: DialogSchemaBase;
//
//   reload?: SchemaReload;
//   redirect?: string;
// }
//
// export type ActionSchema =
//   | AjaxActionSchema
//   | UrlActionSchema
//   | LinkActionSchema
//   | DialogActionSchema
//   | DrawerActionSchema
//   | CopyActionSchema
//   | ReloadActionSchema
//   | OtherActionSchema
//   | VanillaAction;
