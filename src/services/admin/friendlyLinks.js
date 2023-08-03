const { Op } = require('sequelize');
const { FriendlyLinks } = require('../../db/model/index');
const { handlerRows } = require('../_format');

/**
 * 创建友情链接
 * @param {string} linkUrl 友链地址
 * @param {string} linkName 友链名称
 * @param {number} approved 审批状态
 * @param {string} linkSort 友链排序
 * @param {string} remarks 友链备注
 */
async function createFriendlyLink({ linkUrl, linkName, approved = 0, linkSort, remarks }) {
  // 插入数据
  const result = await FriendlyLinks.create({
    linkUrl,
    linkName,
    approved,
    linkSort,
    remarks,
  });
  return result.dataValues;
}

/**
 * 查询友情链接列表
 * @param {string} linkName 友链名称
 * @param {string} pageSize 每页大小
 * @param {string} pageNum 页码
 */
async function servicesGetList({ linkName = '', pageSize, pageNum }) {
  // 加入模糊查询
  const { count, rows } = await FriendlyLinks.findAndCountAll({
    attributes: { exclude: ['password'] },
    where: {
      userName: {
        [Op.like]: `%${linkName}%`,
      },
    },
    offset: pageSize * (pageNum - 1),
    limit: pageSize,
  });
  // 格式化数据
  const list = handlerRows(rows);
  return { list, count, pageNum };
}

/**
 * 删除友情链接
 * @param {string} id 用户名称
 */
async function servicesDeleteLink({ id }) {
  // 加入模糊查询
  const result = await FriendlyLinks.destroy({
    where: {
      id: id,
    },
  });
  if (result) {
    return {};
  }
}

module.exports = {
  createFriendlyLink,
  servicesGetList,
  servicesDeleteLink,
};
