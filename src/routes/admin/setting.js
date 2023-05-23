// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const { uploadFile, downloadBigFile } = require('../../controller/admin/setting');
const { genValidator } = require('../../middlewares/validator');
const contentCategoryValidate = require('../../validator/contentCategory');
const { upload } = require('../../middlewares/upload');

// 路由前缀
router.prefix('/api/setting');

// 查询所有文档类别
router.post('/uploadFile', upload.fields([{ name: 'file' }]), async (ctx, next) => {
  ctx.body = await uploadFile(ctx);
});
// 测试下载大文件
router.post('/downloadBigFile', async (ctx, next) => {
  await downloadBigFile(ctx);
});
// 导出路由
module.exports = router;
