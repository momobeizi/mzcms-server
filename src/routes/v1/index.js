
// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
// 路由前缀
// router.prefix('/api/index');

// 首页
router.get('/', '', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = `<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} a{color:#2E5CD5;cursor:
      pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family:
      "Century Gothic","Microsoft yahei"; color: #333;font-size:18px;} h1{ font-size: 100px; font-weight: normal;
      margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"><p>
      MZCms <br/><span style="font-size:30px">欢迎使用MZCms内容管理系统</span>
      <br/><span style="font-size:30px">不求代码改变世界，只求解决温饱</span></p></div> `;
});

// 导出路由
module.exports = router;
