const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

// users数据库表，sequelize会在数据库中自动以复数建表
const Odometer = seq.define('odometer', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一',
  },
  date: {
    type: STRING,
    allowNull: false,
    comment: '日期',
  },
  mileage: {
    type: STRING,
    allowNull: false,
    comment: '里程数(km)',
  },
  refuelingAmount: {
    type: DECIMAL,
    allowNull: false,
    comment: '加油金额(元)',
  },
  oilQuantity: {
    type: DECIMAL,
    comment: '油量（升）',
  },
});

module.exports = Odometer;
