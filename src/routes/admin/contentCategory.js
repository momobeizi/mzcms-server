// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const {
  addContentCategory,
  deleteContentCategory,
  editContentCategory,
  findOneContentCategory,
  findAllContentCategory,
} = require('../../controller/admin/contentCategory');
const { genValidator } = require('../../middlewares/validator');
const contentCategoryValidate = require('../../validator/contentCategory');

// 路由前缀
router.prefix('/api/contentCategory');

// 添加文档类别
router.post('/add', genValidator(contentCategoryValidate), async (ctx, next) => {
  const { parentId, name, keywords, url, enable, comments } = ctx.request.body;
  ctx.body = await addContentCategory(ctx, { parentId, name, keywords, url, enable, comments });
});

// 删除文档类别
router.post('/delete', genValidator(contentCategoryValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await deleteContentCategory(ctx, { id });
});

// 修改文档类别
router.post('/edit', genValidator(contentCategoryValidate), async (ctx, next) => {
  const { id, parentId, name, keywords, url, enable, comments } = ctx.request.body;
  ctx.body = await editContentCategory(ctx, {
    id,
    parentId,
    name,
    keywords,
    url,
    enable,
    comments,
  });
});

// 查询单条文档类别
router.post('/findOne', genValidator(contentCategoryValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await findOneContentCategory(ctx, {
    id,
  });
});

// 查询所有文档类别
router.post('/findAll', genValidator(contentCategoryValidate), async (ctx, next) => {
  ctx.body = await findAllContentCategory(ctx, {});
});
// 导出路由
module.exports = router;
