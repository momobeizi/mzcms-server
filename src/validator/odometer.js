const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userId: {
      type: 'number',
      maxLength: 255,
    },
    userName: {
      type: 'string',
      maxLength: 255,
    },
    date: {
      type: 'string',
      maxLength: 255,
    },
    mileage: {
      type: 'number',
      maxLength: 255,
    },
    refuelingAmount: {
      type: 'number',
      maxLength: 255,
    },
    oilQuantity: {
      type: 'number',
      maxLength: 255,
    },
  },
};

/**
 * 校验数据格式
 * @param {Object} data 用户数据
 */
function odometerValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = odometerValidate;
