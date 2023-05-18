const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    parentId: {
      type: 'string',
      maxLength: 255,
    },
    name: {
      type: 'string',
      maxLength: 255,
    },
    keywords: {
      type: 'string',
      maxLength: 255,
    },
    url: {
      type: 'string',
      maxLength: 255,
    },
    enable: {
      type: 'number',
      minimum: 0,
      maximum: 1,
    },
    comments: {
      type: 'string',
      maxLength: 255,
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
