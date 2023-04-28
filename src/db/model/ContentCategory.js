const seq = require('../seq');
const { STRING, DECIMAL, NUMBER } = require('../types');

// contentCategory数据库表，sequelize会在数据库中自动以复数建表
const ContentCategory = seq.define('contentCategory', {
  parentId: {
    type: DECIMAL,
    allowNull: false,
    comment: '父级id',
  },
  name: {
    type: STRING,
    allowNull: false,
    comment: '类别名称',
  },
  keywords: {
    type: STRING,
    allowNull: false,
    comment: '关键字',
  },
  url: {
    type: STRING,
    allowNull: false,
    comment: 'url',
  },
  enable: {
    type: STRING,
    allowNull: false,
    defaultValue: 0,
    comment: '是否启用(0:停用，1:启用)',
  },
  comments: {
    type: STRING,
    comment: '描述',
  },
});

module.exports = ContentCategory;
