// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const { renderWebsiteIndex } = require('../../controller/website/index');

// 首页
router.get('/', '', async (ctx, next) => {
  // 静态页面路径
  const indexFilePath = path.join(__dirname, '../../../public/website', 'index.html');
  // 判断是否已经存在静态页面
  if (fs.existsSync(indexFilePath)) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(indexFilePath);
  } else {
    // 不存在则生成静态文件并返回
    const html = await renderWebsiteIndex();
    ctx.type = 'html';
    ctx.body = html;
    fs.writeFileSync(indexFilePath, html);
  }
});

// 导出路由
module.exports = router;
