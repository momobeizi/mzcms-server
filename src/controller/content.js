const {
  servicesAddContent,
  servicesDeleteContent,
  servicesEditContent,
  servicesFindOneContent,
  servicesFindAllContent,
} = require('../services/content');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { addContentFailInfo } = require('../model/ErrorInfo');

/**
 * 添加文章
 * @param {object} ctx 上下文
 * @param {string} title 文章标题
 * @param {string} abstract 摘要
 * @param {string} content 内容
 * @param {string} status 状态
 * @param {string} contentCategory 分类
 * @param {string} keywords 关键字
 * @param {string} imgUrl 封面图片
 * @param {string} readNum 是否推荐
 * @param {string} label 标签
 * @param {string} contentType 文章内容类型
 */
async function addContent(
  ctx,
  {
    title,
    abstract,
    content,
    status,
    contentCategory,
    keywords,
    imgUrl,
    readNum,
    recommend,
    label,
    contentType,
  }
) {
  const result = await servicesAddContent({
    title,
    abstract,
    content,
    status,
    contentCategory,
    keywords,
    imgUrl,
    readNum,
    recommend,
    label,
    contentType,
  });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentFailInfo);
}

/**
 * 删除文章
 * @param {object} ctx 上下文
 * @param {string} id 文章id
 */
async function deleteContent(ctx, { id }) {
  const result = await servicesDeleteContent({
    id,
  });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentFailInfo);
}

/**
 * 修改文章
 * @param {object} ctx 上下文
 * @param {string} id 文章id
 * @param {string} title 文章标题
 * @param {string} abstract 摘要
 * @param {string} content 内容
 * @param {string} status 状态
 * @param {string} contentCategory 分类
 * @param {string} keywords 关键字
 * @param {string} imgUrl 封面图片
 * @param {string} readNum 是否推荐
 * @param {string} label 标签
 * @param {string} contentType 文章内容类型
 */
async function editContent(
  ctx,
  {
    id,
    title,
    abstract,
    content,
    status,
    contentCategory,
    keywords,
    imgUrl,
    readNum,
    recommend,
    label,
    contentType,
  }
) {
  const result = await servicesEditContent({
    id,
    title,
    abstract,
    content,
    status,
    contentCategory,
    keywords,
    imgUrl,
    readNum,
    recommend,
    label,
    contentType,
  });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentFailInfo);
}

/**
 * 查询单条分类
 * @param {object} ctx 上下文
 * @param {string} id 父级id
 */
async function findOneContent(ctx, { id }) {
  const result = await servicesFindOneContent({
    id,
  });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentFailInfo);
}

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
