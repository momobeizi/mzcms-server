// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  getList,
  deleteUser,
  getUsersInfo,
  logout,
} = require('../../controller/admin/user');
const { genValidator } = require('../../middlewares/validator');
const userValidate = require('../../validator/user');

// 路由前缀
router.prefix('/api/user');

// 用户注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await register({ userName, password });
});

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});

// 用户登录路由
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  const result = await login(ctx, userName, password);
  ctx.cookies.set('mztoken', result?.data?.token, {
    domain: 'localhost', // 设置 cookie 的域
    path: '/', // 设置 cookie 的路径
    maxAge: 3 * 60 * 60 * 1000, // cookie 的有效时间 ms
    httpOnly: true, // 是否要设置 httpOnly
    overwrite: true, // 是否要覆盖已有的 cookie 设置
  });
  ctx.body = result;
});

// 用户退出登陆
router.get('/logout', async (ctx, next) => {
  const result = await logout(ctx);
  ctx.body = result;
});

// 修改个人信息
router.patch('/changeInfo', async (ctx, next) => {
  const { nickName, picture } = ctx.request.body;
  ctx.body = await changeInfo(ctx, { nickName, picture });
});

// 修改个人密码
router.patch('/changePassword', genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body;
  ctx.body = await changePassword(ctx, { password, newPassword });
});

// 查询用户列表
router.post('/getList', genValidator(userValidate), async (ctx, next) => {
  const { userName, pageSize, pageNum } = ctx.request.body;
  ctx.body = await getList(ctx, { userName, pageSize, pageNum });
});

// 删除用户
router.post('/deleteUser', genValidator(userValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await deleteUser(ctx, { id });
});

// 获取用户信息
router.post('/getUserInfo', genValidator(userValidate), async (ctx, next) => {
  ctx.body = await getUsersInfo(ctx);
});

// 导出路由
module.exports = router;
