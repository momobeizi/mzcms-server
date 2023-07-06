const seq = require('../seq');
const { STRING, DECIMAL, INTEGER } = require('../types');

// users数据库表，sequelize会在数据库中自动以复数建表
const Odometer = seq.define('odometer', {
  userId: {
    type: INTEGER,
    allowNull: false,
    unique: true,
    comment: '用户id',
  },
  userName: {
    type: STRING,
    allowNull: false,
    comment: '用户名',
  },
  date: {
    type: STRING,
    allowNull: false,
    comment: '日期',
  },
  mileage: {
    type: STRING,
    allowNull: false,
    comment: '里程数',
  },
  refuelingAmount: {
    type: DECIMAL,
    allowNull: false,
    comment: '加油金额',
  },
  oilQuantity: {
    type: DECIMAL,
    allowNull: false,
    comment: '油量',
  },
});

module.exports = Odometer;
