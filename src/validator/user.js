const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      maxLength: 255,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    nickName: {
      type: 'string',
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3,
    },
    pageSize: {
      type: 'number',
      minimum: 1,
    },
    pageNum: {
      type: 'number',
      minimum: 1,
    },
    id: {
      type: 'number',
      minimum: 1,
    },
  },
};

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = userValidate;
