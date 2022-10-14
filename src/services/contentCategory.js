const { Op } = require('sequelize');
const { ContentCategory } = require('../db/model/index');
const { handlerRows } = require('./_format');

/**
 * 添加类别
 * @param {string} parentId 父级id
 * @param {string} name 分类名
 * @param {string} keywords 分类关键字
 * @param {string} url 分类url
 * @param {string} enable 分类是否启用
 * @param {string} comments 分类备注
 */
async function servicesAddContentCategory({ parentId, name, keywords, url, enable, comments }) {
  const result = await ContentCategory.create({
    parentId,
    name,
    keywords,
    url,
    enable,
    comments,
  });
  if (result) {
    return {};
  }
}

/**
 * 删除类别
 * @param {string} id id
 */
async function servicesDeleteContentCategory({ id }) {
  const result = await ContentCategory.destroy({
    where: {
      id,
    },
  });
  if (result) {
    return {};
  }
}

/**
 * 编辑类别
 * @param {string} id id
 * @param {string} parentId 父级id
 * @param {string} name 分类名
 * @param {string} keywords 分类关键字
 * @param {string} url 分类url
 * @param {string} enable 分类是否启用
 * @param {string} comments 分类备注
 */
async function servicesEditContentCategory({
  id,
  parentId,
  name,
  keywords,
  url,
  enable,
  comments,
}) {
  const result = await ContentCategory.update(
    {
      parentId,
      name,
      keywords,
      url,
      enable,
      comments,
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
 * 查询单条类别
 * @param {string} id id
 */
async function servicesFindOneContentCategory({ id }) {
  const result = await ContentCategory.findOne({
    where: {
      id,
    },
  });
  if (result) {
    return handlerRows(result);
  }
}

/**
 * 查询所有类别
 * @param {string} id id
 */
async function servicesFindAllContentCategory() {
  const result = await ContentCategory.findAll();
  if (result) {
    return handlerRows(result);
  }
}

module.exports = {
  servicesAddContentCategory,
  servicesDeleteContentCategory,
  servicesEditContentCategory,
  servicesFindOneContentCategory,
  servicesFindAllContentCategory,
};
