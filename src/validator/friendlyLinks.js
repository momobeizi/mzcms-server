const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    linkUrl: {
      type: 'string',
    },
    linkName: {
      type: 'string',
    },
    approved: {
      type: 'number',
    },
    linkSort: {
      type: 'number',
    },
    remarks: {
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
 * @param {Object} data 提交的数据
 */
function friendlyLinksValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = friendlyLinksValidate;
