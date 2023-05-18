const seq = require('../seq');
const { STRING, DECIMAL, TEXT } = require('../types');

// content数据库表，sequelize会在数据库中自动以复数建表
const Content = seq.define('Content', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '标题',
  },
  abstract: {
    type: STRING,
    allowNull: false,
    comment: '摘要',
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '文章内容(html/markdown)',
  },
  status: {
    type: STRING,
    allowNull: false,
    comment: '状态(0:草稿，1:已发布,2:撤回)',
  },
  contentCategory: {
    type: DECIMAL,
    allowNull: false,
    comment: '文章类别',
  },
  keywords: {
    type: STRING,
    allowNull: false,
    comment: '关键字',
  },
  imgUrl: {
    type: STRING,
    allowNull: false,
    comment: '文章封面',
  },
  readNum: {
    type: DECIMAL,
    allowNull: false,
    comment: '阅读量',
  },
  recommend: {
    type: DECIMAL,
    allowNull: false,
    comment: '是否推荐(0:否，1:是)',
  },
  label: {
    type: STRING,
    allowNull: false,
    comment: '标签',
  },
  contentType: {
    type: STRING,
    allowNull: false,
    comment: '内容格式（html,markdown）',
  },
});

module.exports = Content;
