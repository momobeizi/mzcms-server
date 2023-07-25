const {
  getUserInfo,
  createUser,
  updateUser,
  servicesGetList,
  servicesDeleteUser,
} = require('../../services/admin/user');
const { SuccessModel, ErrorModel } = require('../../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
  deleteUserFailInfo,
} = require('../../model/ErrorInfo');
const { SECRET } = require('../../conf/constant');
const doCrypto = require('../../utils/cryp');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const { redisSet, redisGet, redisDel } = require('../../cache/_redis');
const UUID = require('uuid');

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 已存在
    return new SuccessModel(userInfo);
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 * 用户注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function register({ userName, password }) {
  const userInfo = await getUserInfo(userName);
  // 判断用户名是否存在
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo);
  }

  // 用户注册
  try {
    // 注册成功
    await createUser({
      userName,
      password: doCrypto(password),
    });
    return new SuccessModel();
  } catch (ex) {
    // 注册失败
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 后台添加用户
 * @param {string} userName 用户账号
 * @param {string} nickName 昵称
 * @param {string} picture 头像
 * @param {string} gender 性别
 * @param {string} password 密码
 */
async function addUserInfo({ userName, nickName, picture, gender, password }) {
  const userInfo = await getUserInfo(userName);
  // 判断用户名是否存在
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo);
  }

  // 用户注册
  try {
    // 注册成功
    await createUser({
      userName,
      nickName,
      picture,
      gender,
      password: doCrypto(password),
    });
    return new SuccessModel();
  } catch (ex) {
    // 注册失败
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 用户登录
 * @param {Object} ctx koa2 ctx上下文
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo);
  }

  // 登录成功,使用jwt加密用户信息，返回token
  const uuid = UUID.v1().replace(/-/g, '');
  await redisSet(uuid, userInfo);
  const token = jwt.sign({ uuid }, SECRET, { expiresIn: '4h' });
  const data = { token, userInfo };
  return new SuccessModel(data);
}

/**
 * 退出登陆
 * @param {Object} ctx ctx上下文
 */
async function logout(ctx) {
  await redisDel(ctx.uuid);
  ctx.cookies.set('mztoken', '', {
    domain: 'localhost', // 设置 cookie 的域
    path: '/', // 设置 cookie 的路径
    maxAge: 0, // cookie 的有效时间 ms
    overwrite: true, // 是否要覆盖已有的 cookie 设置
  });
  return new SuccessModel({ message: '退出成功' });
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx上下文
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, picture, gender }) {
  // 解析token，获取用户信息
  const { userName } = ctx.user;
  if (!nickName) {
    nickName = userName;
  }
  const result = await updateUser(
    {
      newNickName: nickName,
      newPicture: picture,
      newGender: gender,
    },
    { userName }
  );
  if (result) {
    // 执行成功
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改个人密码
 * @param {object} ctx 上下文
 * @param {string} password 旧密码
 * @param {string} newPassword 新密码
 */
async function changePassword(ctx, { password, newPassword }) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const { userName } = payload;
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    {
      userName,
      password: doCrypto(password),
    }
  );
  if (result) {
    // 修改成功
    return new SuccessModel();
  }

  // 修改失败
  return new ErrorModel(changePasswordFailInfo);
}

/**
 * 查询用户列表
 * @param {object} ctx 上下文
 * @param {string} userName 用户名称
 * @param {string} pageSize 每页大小
 * @param {string} pageNum 当前页
 */
async function getList(ctx, { userName, pageSize, pageNum }) {
  const result = await servicesGetList({ userName, pageSize, pageNum });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(changePasswordFailInfo);
}

/**
 * 删除用户
 * @param {object} ctx 上下文
 * @param {string} userName 用户id
 */
async function deleteUser(ctx, { id }) {
  const result = await servicesDeleteUser({ id });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(deleteUserFailInfo);
}

/**
 * 获取用户信息
 * @param {string} userName 用户名
 */
async function getUsersInfo(ctx) {
  const userInfo = await getUserInfo(ctx.user.userName);
  if (userInfo) {
    // 已存在
    return new SuccessModel(userInfo);
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  getList,
  deleteUser,
  getUsersInfo,
  logout,
  addUserInfo,
};
