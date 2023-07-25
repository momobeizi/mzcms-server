const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 255,
    },
    abstract: {
      type: 'string',
      maxLength: 255,
    },
    content: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
    contentCategory: {
      type: 'string',
    },
    keywords: {
      type: 'string',
    },
    imgUrl: {
      type: 'string',
    },
    pageSize: {
      type: 'number',
      minimum: 1,
    },
    pageNum: {
      type: 'number',
      minimum: 1,
    },
  },
};

/**
 * 校验数据格式
 * @param {Object} data 用户数据
 */
function contentValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = contentValidate;
