// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const {
  addContent,
  deleteContent,
  editContent,
  findOneContent,
  findAllContent,
} = require('../../controller/admin/content');
const { genValidator } = require('../../middlewares/validator');
const contentValidate = require('../../validator/content');

// 路由前缀
router.prefix('/api/content');

// 添加文档类别
router.post('/add', genValidator(contentValidate), async (ctx, next) => {
  const {
    title,
    abstract,
    content,
    status,
    contentCategory,
    keywords,
    imgUrl,
    readNum,
    recommend,
    label,
    contentType,
  } = ctx.request.body;
  ctx.body = await addContent(ctx, {
    title,
    abstract,
    content,
    status,
    contentCategory,
    keywords,
    imgUrl,
    readNum,
    recommend,
    label,
    contentType,
  });
});

// 删除文档
router.post('/delete', genValidator(contentValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await deleteContent(ctx, { id });
});

// 修改文档
router.post('/edit', genValidator(contentValidate), async (ctx, next) => {
  const {
    id,
    title,
    abstract,
    content,
    status,
    contentCategory,
    keywords,
    imgUrl,
    readNum,
    recommend,
    label,
    contentType,
  } = ctx.request.body;
  ctx.body = await editContent(ctx, {
    id,
    title,
    abstract,
    content,
    status,
    contentCategory,
    keywords,
    imgUrl,
    readNum,
    recommend,
    label,
    contentType,
  });
});

// 查询单条文档
router.post('/findOne', genValidator(contentValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await findOneContent(ctx, {
    id,
  });
});

// 查询所有文档
router.post('/findAll', genValidator(contentValidate), async (ctx, next) => {
  const { title, pageSize, pageNum } = ctx.request.body;
  ctx.body = await findAllContent(ctx, { title, pageSize, pageNum });
});
// 导出路由
module.exports = router;
