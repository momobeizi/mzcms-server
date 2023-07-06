const { addOdometerServices, findOdometerListServices } = require('../../services/admin/odometer');
const { SuccessModel, ErrorModel } = require('../../model/ResModel');
const { addOdometerFailInfo, findOdometerListFailInfo } = require('../../model/ErrorInfo');
/**
 * 添加里程信息
 * @param {string} userId 用户id，唯一
 * @param {string} userName 用户名
 * @param {string} date 日期
 * @param {string} mileage 里程数(km)
 * @param {string} refuelingAmount 加油金额(元)
 * @param {string} oilQuantity 油量(升)
 */
async function addOdometer(ctx, { userId, userName, date, mileage, refuelingAmount, oilQuantity }) {
  const info = {
    userId,
    userName,
    date,
    mileage,
    refuelingAmount,
    oilQuantity,
  };
  try {
    // 添加成功
    await addOdometerServices(info);
    return new SuccessModel();
  } catch (ex) {
    // 修改失败
    console.error(ex.message, ex.stack);
    return new ErrorModel(addOdometerFailInfo);
  }
}

/**
 * 查询里程信息列表
 * @param {string} userName 用户名
 * @param {string} pageSize 每页大小
 * @param {string} pageNum 页码
 */
async function findOdometerList(ctx, { userName, pageSize, pageNum }) {
  const result = await findOdometerListServices({ userName, pageSize, pageNum });
  if (result) {
    // 查询成功
    return new SuccessModel(result);
  }
  // 查询失败;
  return new ErrorModel(findOdometerListFailInfo);
}

/**
 * 查询单条里程信息
 * @param {string} id 数据id
 */
async function findOneOdometer(ctx, { id }) {
  const result = await findOdometerListServices({ id });
  if (result) {
    // 查询成功
    return new SuccessModel(result);
  }
  // 查询失败;
  return new ErrorModel(findOdometerListFailInfo);
}

/**
 * 删除里程信息
 * @param {string} id 数据id
 */
async function deleteOdometer(ctx, { id }) {
  const result = await findOdometerListServices({ id });
  if (result) {
    // 查询成功
    return new SuccessModel(result);
  }
  // 删除失败;
  return new ErrorModel(findOdometerListFailInfo);
}

module.exports = {
  addOdometer,
  findOdometerList,
  findOneOdometer,
  deleteOdometer,
};
