const { Op } = require('sequelize');
const { User } = require('../db/model/index');
const { formatUser, handlerRows } = require('./_format');

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = { userName };

  // 判断请求体里是否存在密码
  if (password) {
    // 将密码也放到查询条件中
    Object.assign(whereOpt, { password });
  }

  // 查询数据库
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    where: whereOpt,
  });

  // 判断是否查询到数据
  if (result == null) {
    // 未找到
    return result;
  }

  // 格式化数据
  const formatRes = formatUser(result.dataValues);
  return formatRes;
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  // 插入数据
  const result = await User.create({
    userName,
    password,
    nickName: nickName || userName,
    gender,
  });
  return result.dataValues;
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 {newPassword,newNickName,newPicture,newCity}
 * @param {Object} param1 查询条件 {userName,password}
 */
async function updateUser({ newPassword, newNickName, newPicture }, { userName, password }) {
  // 拼接修改内容
  const updateData = {};
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }

  // 拼接查询条件
  const whereData = {
    userName,
  };
  if (password) {
    whereData.password = password;
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData,
  });

  return result[0] > 0; // 修改的行数
}

/**
 * 查询用户列表
 * @param {string} userName 用户名称
 * @param {string} pageSize 每页大小
 * @param {string} pageNum 页码
 */
async function servicesGetList({ userName = '', pageSize, pageNum }) {
  // 加入模糊查询
  const { count, rows } = await User.findAndCountAll({
    attributes: { exclude: ['password'] },
    where: {
      userName: {
        [Op.like]: `%${userName}%`,
      },
    },
    offset: pageSize * (pageNum - 1),
    limit: pageSize,
  });
  // 格式化数据
  const list = handlerRows(rows);
  return { list, count, pageNum };
}

/**
 * 删除用户
 * @param {string} id 用户名称
 */
async function servicesDeleteUser({ id }) {
  // 加入模糊查询
  const result = await User.destroy({
    where: {
      id: id,
    },
  });
  if (result) {
    return {};
  }
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  servicesGetList,
  servicesDeleteUser,
};
