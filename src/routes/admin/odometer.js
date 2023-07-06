// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const {
  addOdometer,
  findOdometerList,
  findOneOdometer,
  deleteOdometer,
} = require('../../controller/admin/odometer');
const { genValidator } = require('../../middlewares/validator');
const odometerValidate = require('../../validator/odometer');

// 路由前缀
router.prefix('/api/odometer');

// 新增里程数据
router.post('/add', genValidator(odometerValidate), async (ctx, next) => {
  const { userId, userName, date, mileage, refuelingAmount, oilQuantity } = ctx.request.body;
  ctx.body = await addOdometer(ctx, {
    userId,
    userName,
    date,
    mileage,
    refuelingAmount,
    oilQuantity,
  });
});

// 分页查询里程列表
router.post('/list', genValidator(odometerValidate), async (ctx, next) => {
  const { title, pageSize, pageNum } = ctx.request.body;
  ctx.body = await findOdometerList(ctx, { title, pageSize, pageNum });
});

// 查询单条里程数据列表
router.post('/findOne', genValidator(odometerValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await findOneOdometer(ctx, { id });
});

// 删除里程数据
router.post('/delete', genValidator(odometerValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await deleteOdometer(ctx, { id });
});

// 导出路由
module.exports = router;
