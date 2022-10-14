const sequelize = require('sequelize');
const Sequelize = require('sequelize');

/**
 * 此处只封装了几个常见的，若需要其他配置，可访问官方文档，自行配置
 * 官方文档--https://sequelize.org/
 */
module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
  NUMBER: sequelize.NUMBER,
};
