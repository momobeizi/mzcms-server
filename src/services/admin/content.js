const { Op } = require('sequelize');
const { Content } = require('../../db/model/index');
const { handlerRows } = require('../_format');

/**
 * 添加文章
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
async function servicesAddContent({
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
}) {
  console.log(
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
    contentType
  );
  const result = await Content.create({
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
    return {};
  }
}

/**
 * 删除文章
 * @param {string} id id
 */
async function servicesDeleteContent({ id }) {
  const result = await Content.destroy({
    where: {
      id,
    },
  });
  if (result) {
    return {};
  }
}

/**
 * 修改文章
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
async function servicesEditContent({
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
}) {
  const result = await Content.update(
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
    },
    {
      where: {
        id,
      },
    }
  );
  if (result) {
    return {};
  }
}

/**
 * 查询单条文章
 * @param {string} id id
 */
async function servicesFindOneContent({ id }) {
  const result = await Content.findOne({
    where: {
      id,
    },
  });
  if (result) {
    return handlerRows(result);
  }
}

/**
 * 查询文章列表
 * @param {string} title 用户名称
 * @param {string} pageSize 每页大小
 * @param {string} pageNum 页码
 */
async function servicesFindAllContent({ title = '', pageSize, pageNum }) {
  // 加入模糊查询
  const { count, rows } = await Content.findAndCountAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
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
  servicesAddContent,
  servicesDeleteContent,
  servicesEditContent,
  servicesFindOneContent,
  servicesFindAllContent,
};
