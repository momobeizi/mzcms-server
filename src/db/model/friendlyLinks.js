const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

// users数据库表，sequelize会在数据库中自动以复数建表
const FriendlyLinks = seq.define('friendlyLinks', {
  linkUrl: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '友情链接URL',
  },
  linkName: {
    type: STRING,
    allowNull: false,
    comment: '友情链接名称',
  },
  approved: {
    type: DECIMAL,
    defaultValue: 0,
    comment: '是否审核（0 未审核，1 已审核）',
  },
  linkSort: {
    type: DECIMAL,
    comment: '显示排序正序1=>999,1显示第一位',
  },
  remarks: {
    type: STRING,
    comment: '备注',
  },
});

module.exports = FriendlyLinks;
