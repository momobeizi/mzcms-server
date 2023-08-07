// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const { add, findAll } = require('../../controller/admin/friendlyLinks');
const { genValidator } = require('../../middlewares/validator');
const friendlyLinksValidate = require('../../validator/content');

// 路由前缀
router.prefix('/api/friendlyLinks');

// 添加文档类别
router.post('/add', genValidator(friendlyLinksValidate), async (ctx, next) => {
  const { linkName, linkUrl, approved, linkSort, remarks } = ctx.request.body;
  ctx.body = await add(ctx, {
    linkName,
    linkUrl,
    approved,
    linkSort,
    remarks,
  });
});

// 删除文档
router.post('/delete', genValidator(friendlyLinksValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await deleteContent(ctx, { id });
});

// 修改文档
router.post('/edit', genValidator(friendlyLinksValidate), async (ctx, next) => {
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
router.post('/findOne', genValidator(friendlyLinksValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await findOneContent(ctx, {
    id,
  });
});

// 查询所有
router.post('/getLinkList', genValidator(friendlyLinksValidate), async (ctx, next) => {
  const { linkName, pageSize, pageNum } = ctx.request.body;
  ctx.body = await findAll(ctx, { linkName, pageSize, pageNum });
});
// 导出路由
module.exports = router;
