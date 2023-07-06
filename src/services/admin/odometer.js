const { Odometer } = require('../../db/model/index');
const { Op } = require('sequelize');
const { handlerRows } = require('../_format');

/**
 * 添加里程信息
 * @param {string} userId 用户id，唯一
 * @param {string} userName 用户名
 * @param {string} date 日期
 * @param {string} mileage 里程数(km)
 * @param {string} refuelingAmount 加油金额(元)
 * @param {string} oilQuantity 油量(升)
 */
async function addOdometerServices({
  userId,
  userName,
  date,
  mileage,
  refuelingAmount,
  oilQuantity,
}) {
  // 插入数据
  const result = await Odometer.create({
    userId,
    userName,
    date,
    mileage,
    refuelingAmount,
    oilQuantity,
  });
  return result.dataValues;
}

/**
 * 查询里程表列表
 * @param {string} userName 司机名称
 * @param {string} pageSize 每页大小
 * @param {string} pageNum 页码
 */
async function findOdometerListServices({ userName = '', pageSize, pageNum }) {
  // 加入模糊查询
  const { count, rows } = await Odometer.findAndCountAll({
    where: {
      userName: {
        [Op.like]: `%${userName}%`,
      },
    },
    offset: pageSize * (pageNum - 1),
    limit: pageSize,
  });
  // 格式化数据
  const list = handlerRows(rows);
  return { list, count, pageNum };
}

module.exports = {
  addOdometerServices,
  findOdometerListServices,
};
