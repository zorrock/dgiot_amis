/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot_amis 
 *  version : 0.0.2 
 *  description : dgiot_amis 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Wed Oct 13 2021 04:24:35 GMT+0000 (Coordinated Universal Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"1qYT":function(l,e,t){"use strict";t.r(e),t.d(e,"schema",(function(){return w}));var i=t("wG3i"),a=t.n(i),x=t("TSYQ"),h=t.n(x),o=t("w5tg"),d=t("oda9"),b=t("la/R"),n=[{label:"A",value:"a"},{label:"B",value:"b",children:[{label:"B-1",value:"b-1"},{label:"B-2",value:"b-2"},{label:"B-3",value:"b-3"}]},{label:"C",value:"c"}],w={type:"page",title:"",toolbar:[],body:[{type:"form",title:"输入框类型",mode:"horizontal",className:h()(o.b.flex_label6x,o.b.flex_input26x),controls:[{type:"text",name:"f1",label:"简单文本"},{type:"textarea",name:"f2",label:"多行文本"},{type:"number",name:"f3",label:"数字"},{type:"checkbox",name:"f6",label:"多选框"},{type:"checkboxes",name:"f7",label:"多选组",columnsCount:3,options:d.d},{type:"switch",name:"f29",label:"开关"},{type:"radios",name:"f24",label:"单选框",columnsCount:3,options:d.d},{type:"list",name:"f20",label:"选择列表",options:d.d,inputClassName:o.e.width_unset},{type:"date",name:"f10",label:"日期",inputClassName:o.e.width13x},{type:"datetime",name:"f11",label:"日期时间",inputClassName:o.e.width13x},{type:"time",name:"f30",label:"时间选择",inputClassName:o.e.width13x},{type:"date-range",name:"f12",label:"日期范围"},{type:"datetime-range",name:"f13",label:"日期时间范围"},{type:"month",name:"f14",label:"月份",inputClassName:o.e.width13x},{type:"select",name:"f4",label:"下拉选择",options:d.d},{type:"tree-select",name:"f34",label:"树形选择器",options:n},{type:"nested-select",name:"f22",label:"级联选择器",options:n},{type:"tag",name:"f29",label:"标签选择器",options:d.d},{type:"color",name:"f9",label:"颜色选择",inputClassName:o.e.width13x},{type:"city",name:"f8",label:"城市选择"},{type:"picker",name:"f23",label:"对话框选择",options:d.d,inputClassName:o.e.width13x},{type:"tree",name:"f33",label:"树形选择",options:n},{type:"file",name:"f17",label:"上传文件",reciever:"".concat(b.b,"/iotapi/amis-api/curd-page@uploadFile")},{type:"image",name:"f18",label:"上传图片",reciever:"".concat(b.b,"/iotapi/amis-api/curd-page@uploadFile")},{type:"rating",name:"f25",label:"评分"},{type:"range",name:"f26",label:"滑动输入"},{type:"submit",label:"提交",level:"primary"}],api:{method:"post",url:"".concat(b.b,"/iotapi/amis-api/curd-page@mockSubmit")}},{type:"divider"},{type:"form",title:"不常用表单项",mode:"horizontal",className:h()(o.b.flex_label6x,o.b.flex_input26x),submitText:"",controls:[{type:"repeat",name:"f27",label:"频率选择器"},{type:"matrix",name:"f21",label:"矩阵选择",rowLabel:"人员",columns:[{label:"篮球"},{label:"美术"},{label:"音乐"}],rows:[{label:"张三"},{label:"李四"},{label:"王五"}]},{type:"transfer",name:"f31",label:"穿梭器",options:d.d},{type:"tabs-transfer",name:"f32",label:"组合穿梭器",inputClassName:o.e.width48x,selectMode:"tree",options:[{label:"成员",selectMode:"tree",children:n},{label:"用户",selectMode:"chained",children:n}]},{type:"submit",label:"提交",level:"primary"}],api:{method:"post",url:"".concat(b.b,"/iotapi/amis-api/curd-page@mockSubmit")}},{type:"divider"},{type:"form",title:"编辑器",mode:"horizontal",className:h()(o.b.flex_label6x,o.b.flex_input26x),submitText:"",controls:[{type:"rich-text",name:"f28",label:"富文本编辑器",inputClassName:o.e.width_unset},{type:"editor",name:"f15",label:"代码编辑器",language:"json",value:a()(d.d,null,2),inputClassName:o.e.width_unset},{type:"diff-editor",name:"f16",label:"对比编辑器",value:"hello",diffValue:"hello world",inputClassName:o.e.width_unset},{type:"submit",label:"提交",level:"primary"}],api:{method:"post",url:"".concat(b.b,"/iotapi/amis-api/curd-page@mockSubmit")}},{type:"divider"},{type:"divider"}]}},"la/R":function(l,e,t){"use strict";t.d(e,"b",(function(){return a})),t.d(e,"a",(function(){return i}));var i="http://prod.iotn2n.com",a="http://prod.iotn2n.com"},oda9:function(l,e,t){"use strict";t.d(e,"d",(function(){return i})),t.d(e,"a",(function(){return a})),t.d(e,"c",(function(){return x})),t.d(e,"b",(function(){return h}));var i=[{label:"待审核",value:"-3"},{label:"待支付",value:"-2"},{label:"待处理",value:"-1"},{label:"已接单",value:"0"},{label:"已出库",value:"1"},{label:"已签收",value:"2"},{label:"已驳回",value:"3"},{label:"拒收",value:"4"},{label:"已取消",value:"5"}],a=[{label:"O2O",value:"1"},{label:"B2C",value:"2"}],x=[{label:"暂无",value:"-1"},{label:"现金支付",value:"0"},{label:"微信支付",value:"1"},{label:"支付宝",value:"2"},{label:"三方平台线上支付",value:"3"},{label:"小程序",value:"4"},{label:"保险支付",value:"5"},{label:"微信小程序+保险",value:"45"}],h=[{label:"未支付",value:"1"},{label:"已支付",value:"2"}]},w5tg:function(l,e,t){"use strict";var i,a,x,h,o,d;t.d(e,"c",(function(){return i})),t.d(e,"e",(function(){return a})),t.d(e,"d",(function(){return x})),t.d(e,"b",(function(){return o})),t.d(e,"a",(function(){return d})),function(l){l.Inline_Block="global-inline-block",l.MB_None="mb-none"}(i||(i={})),function(l){l.width_full="global-width-full",l.width_unset="global-width-unset",l.width1x="global-width-1x",l.width2x="global-width-2x",l.width3x="global-width-3x",l.width4x="global-width-4x",l.width5x="global-width-5x",l.width6x="global-width-6x",l.width7x="global-width-7x",l.width8x="global-width-8x",l.width9x="global-width-9x",l.width10x="global-width-10x",l.width11x="global-width-11x",l.width12x="global-width-12x",l.width13x="global-width-13x",l.width14x="global-width-14x",l.width15x="global-width-15x",l.width16x="global-width-16x",l.width17x="global-width-17x",l.width18x="global-width-18x",l.width19x="global-width-19x",l.width20x="global-width-20x",l.width21x="global-width-21x",l.width22x="global-width-22x",l.width23x="global-width-23x",l.width24x="global-width-24x",l.width25x="global-width-25x",l.width26x="global-width-26x",l.width27x="global-width-27x",l.width28x="global-width-28x",l.width29x="global-width-29x",l.width30x="global-width-30x",l.width31x="global-width-31x",l.width32x="global-width-32x",l.width33x="global-width-33x",l.width34x="global-width-34x",l.width35x="global-width-35x",l.width36x="global-width-36x",l.width37x="global-width-37x",l.width38x="global-width-38x",l.width39x="global-width-39x",l.width40x="global-width-40x",l.width41x="global-width-41x",l.width42x="global-width-42x",l.width43x="global-width-43x",l.width44x="global-width-44x",l.width45x="global-width-45x",l.width46x="global-width-46x",l.width47x="global-width-47x",l.width48x="global-width-48x"}(a||(a={})),function(l){l.height_full="global-height-full",l.height_unset="global-height-unset",l.height1x="global-height-1x",l.height2x="global-height-2x",l.height3x="global-height-3x",l.height4x="global-height-4x",l.height5x="global-height-5x",l.height6x="global-height-6x",l.height7x="global-height-7x",l.height8x="global-height-8x",l.height9x="global-height-9x",l.height10x="global-height-10x",l.height11x="global-height-11x",l.height12x="global-height-12x",l.height13x="global-height-13x",l.height14x="global-height-14x",l.height15x="global-height-15x",l.height16x="global-height-16x",l.height17x="global-height-17x",l.height18x="global-height-18x",l.height19x="global-height-19x",l.height20x="global-height-20x",l.height21x="global-height-21x",l.height22x="global-height-22x",l.height23x="global-height-23x",l.height24x="global-height-24x"}(x||(x={})),h||(h={}),function(l){l.label2x="form-label-2x",l.label3x="form-label-3x",l.label4x="form-label-4x",l.label5x="form-label-5x",l.label6x="form-label-6x",l.label7x="form-label-7x",l.label8x="form-label-8x",l.label9x="form-label-9x",l.label10x="form-label-10x",l.input10x="form-input-10x",l.input12x="form-input-12x",l.input14x="form-input-14x",l.input16x="form-input-16x",l.input18x="form-input-18x",l.input20x="form-input-20x",l.input22x="form-input-22x",l.input24x="form-input-24x",l.input26x="form-input-26x",l.input28x="form-input-28x",l.input30x="form-input-30x",l.input32x="form-input-32x",l.flex_label2x="flex-form-label-2x",l.flex_label3x="flex-form-label-3x",l.flex_label4x="flex-form-label-4x",l.flex_label5x="flex-form-label-5x",l.flex_label6x="flex-form-label-6x",l.flex_label7x="flex-form-label-7x",l.flex_label8x="flex-form-label-8x",l.flex_label9x="flex-form-label-9x",l.flex_label10x="flex-form-label-10x",l.flex_label12x="flex-form-label-12x",l.flex_label14x="flex-form-label-14x",l.flex_label16x="flex-form-label-16x",l.flex_input10x="flex-form-input-10x",l.flex_input12x="flex-form-input-12x",l.flex_input14x="flex-form-input-14x",l.flex_input16x="flex-form-input-16x",l.flex_input18x="flex-form-input-18x",l.flex_input20x="flex-form-input-20x",l.flex_input22x="flex-form-input-22x",l.flex_input24x="flex-form-input-24x",l.flex_input26x="flex-form-input-26x",l.flex_input28x="flex-form-input-28x",l.flex_input30x="flex-form-input-30x",l.flex_input32x="flex-form-input-32x",l.item_height2_5x="form-item-height-2_5x",l.item_height3_5x="form-item-height-3_5x"}(o||(o={})),function(l){l.width10x="dialog-width-10x",l.width15x="dialog-width-15x",l.width20x="dialog-width-20x",l.width25x="dialog-width-25x",l.width30x="dialog-width-30x",l.width35x="dialog-width-35x",l.width40x="dialog-width-40x",l.width45x="dialog-width-45x",l.width50x="dialog-width-50x",l.width55x="dialog-width-55x",l.width60x="dialog-width-60x",l.width65x="dialog-width-65x",l.width70x="dialog-width-70x",l.width75x="dialog-width-75x",l.width80x="dialog-width-80x",l.width85x="dialog-width-85x",l.width90x="dialog-width-90x",l.width95x="dialog-width-95x",l.width100x="dialog-width-100x",l.width105x="dialog-width-105x",l.width110x="dialog-width-110x",l.width115x="dialog-width-115x",l.width120x="dialog-width-120x",l.width125x="dialog-width-125x",l.width130x="dialog-width-130x",l.width135x="dialog-width-135x",l.width140x="dialog-width-140x",l.width145x="dialog-width-145x",l.width150x="dialog-width-150x"}(d||(d={}))}}]);