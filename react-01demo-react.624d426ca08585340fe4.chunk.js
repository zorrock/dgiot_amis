/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot_amis 
 *  version : 0.0.2 
 *  description : dgiot_amis 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Wed Oct 13 2021 03:37:21 GMT+0000 (Coordinated Universal Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"5FVI":function(t,e,n){"use strict";n.r(e);var a=n("+EbZ"),r=n.n(a),o=n("06Pm"),i=n.n(o),u=n("kA7L"),d=n.n(u),c=n("X5/F"),l=n.n(c),s=n("3SUL"),f=n.n(s),p=n("eYnF"),v=n.n(p),h=(n("07d7"),n("5s+n"),n("p532"),n("SLhn")),m=n.n(h),y=n("cDcd"),k=n.n(y),g=n("Exp3"),I=n("4Iue"),S=n("la/R");function b(t){var e=function(){if("undefined"==typeof Reflect||!r.a)return!1;if(r.a.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(r()(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=v()(t);if(e){var o=v()(this).constructor;n=r()(a,arguments,o)}else n=a.apply(this,arguments);return f()(this,n)}}var x=function(t){l()(n,t);var e=b(n);function n(){var t,a;i()(this,n);for(var r=arguments.length,o=new Array(r),u=0;u<r;u++)o[u]=arguments[u];return(a=e.call.apply(e,m()(t=[this]).call(t,o))).state={loading:!0,count:0,dataSource:[],columns:[{title:"设备id",dataIndex:"objectId",key:"objectId"},{title:"设备名称",dataIndex:"name",key:"name"},{title:"设备地址",dataIndex:"devaddr",key:"devaddr"},{title:"ip地址",dataIndex:"ip"},{title:"设备状态",dataIndex:"status"},{title:"更新时间",dataIndex:"updatedAt"}]},a}return d()(n,[{key:"componentDidMount",value:function(){this.getData()}},{key:"getData",value:function(){var t=this;this.setState({loading:!0}),I.c.get("".concat(S.a,"/iotapi/classes/Device"),{params:{limit:20,skip:0,order:"-createdAt",include:"product,name",where:{product:{$ne:null},name:{$ne:null,$exists:!0}}},headers:{sessionToken:"r:a960ac8d97f46ef14313607e1042bffa"}}).then((function(e){t.setState({loading:!1}),t.setState({dataSource:e.results})})).finally((function(){return t.setState({loading:!1})}))}},{key:"render",value:function(){var t=this.state,e=t.dataSource,n=t.loading,a=t.columns;return k.a.createElement(g.Card,{bordered:!1},k.a.createElement(g.Table,{loading:n,dataSource:e,columns:a}),";")}}]),n}(y.Component);e.default=x},"la/R":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return r}));var a="http://api-dev.msvc.top",r="http://prod.iotn2n.com"}}]);