const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

// users数据库表，sequelize会在数据库中自动以复数建表
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一',
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称',
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1 男性，2 女性，3 保密）',
  },
  picture: {
    type: STRING,
    comment: '头像，图片地址',
  },
});

module.exports = User;
