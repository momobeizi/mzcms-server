// 获取默认头像
const { DEFAULT_PICTURE } = require('../conf/constant');

/**
 * @description: 用户默认头像
 * @param {Object} obj 用户头像
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

/**
 * @description: 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户头像
 */
function formatUser(list) {
  if (!list) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatUserPicture);
  }

  // 单个对象
  return _formatUserPicture(list);
}
function handlerRows(list) {
  if (!list) {
    return list;
  }

  if (list instanceof Array) {
    const resultArr = [];
    // 数组
    list.forEach((el) => {
      resultArr.push(el.dataValues);
    });
    return resultArr;
  }

  // 单个对象
  return list.dataValues;
}

module.exports = {
  formatUser,
  handlerRows,
};
