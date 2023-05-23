const { servicesFindAllContent } = require('../services/website/index');

/**
 * 查询文章列表
 * @param {object} ctx 上下文
 * @param {string} title 文章名称
 * @param {string} pageSize 每页大小
 * @param {string} pageNum 当前页
 */
async function findAllContent(ctx, { title, pageSize, pageNum }) {
  const result = await servicesFindAllContent({ title, pageSize, pageNum });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentFailInfo);
}

module.exports = {
  addContent,
  deleteContent,
  editContent,
  findOneContent,
  findAllContent,
};
