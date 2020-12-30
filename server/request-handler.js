// const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStatic = require('koa-static');
// const KoaSend = require('koa-send');
const {defaultPrefix, proxy, proxyFnc} = require('./proxy');

// router配置
const router = new KoaRouter();
// 健康检查
router.get(['/echo', '/ok'], (ctx) => {
  ctx.body = {status: "ok", timestamp: Date.now()};
})
// api接口代理
router.all("/proxy/(.*)", proxyFnc);

// 其它请求处理
router.all("/(.*)", ctx => {
  ctx.respond = false;
  const {req, res} = ctx;
  const url = `${defaultPrefix}${ctx.originalUrl}`;
  console.log("当前请求:", ctx.originalUrl, " | 使用默认代理前缀:", defaultPrefix, " | url=", url);
  proxy.web(req, res, {target: url, changeOrigin: true});
});
// // 自定义处理
// router.get('/(.*)', async (ctx) => {
//   if (ctx.path === '/') {
//     ctx.path = 'index.html';
//   }
//   await KoaSend(ctx, path.join('/dist', ctx.path));
// });

// 新建app
const app = new Koa();
// 错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
  }
});
// 静态文件服务器
app.use(KoaStatic('./dist', {
  index: 'index.html',
  gzip: true,
  maxage: 1000 * 60 * 60 * 24 * 30,
  setHeaders: (res, path, stats) => {
    let flag = true;
    const suffixArray = ["/index.html", "/favicon.png", "/favicon.ico", ".html"].filter(suffix => path.indexOf(suffix, path.length - suffix.length) !== -1);
    if (suffixArray && suffixArray.length > 0) {
      flag = false;
      res.setHeader('Cache-Control', 'max-age=0,must-revalidate');
    }
    console.log("静态文件: ", path, " | size: ", stats ? (stats.size || '-') : '-', " | ", flag === true ? "[use maxage]" : "[no maxage]");
  },
}));
// 应用router
app.use(router.routes());

exports.app = app;
