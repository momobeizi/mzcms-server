const {
  servicesAddContentCategory,
  servicesDeleteContentCategory,
  servicesEditContentCategory,
  servicesFindOneContentCategory,
  servicesFindAllContentCategory,
} = require('../../services/admin/contentCategory');
const { SuccessModel, ErrorModel } = require('../../model/ResModel');
const { addContentCategoryFailInfo } = require('../../model/ErrorInfo');

/**
 * 添加分类
 * @param {object} ctx 上下文
 * @param {string} parentId 父级id
 * @param {string} name 分类名
 * @param {string} keywords 分类关键字
 * @param {string} url 分类url
 * @param {string} enable 分类是否启用
 * @param {string} comments 分类备注
 */
async function addContentCategory(ctx, { parentId, name, keywords, url, enable, comments }) {
  const result = await servicesAddContentCategory({
    parentId,
    name,
    keywords,
    url,
    enable,
    comments,
  });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentCategoryFailInfo);
}

/**
 * 删除分类
 * @param {object} ctx 上下文
 * @param {string} id 父级id
 */
async function deleteContentCategory(ctx, { id }) {
  const result = await servicesDeleteContentCategory({
    id,
  });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentCategoryFailInfo);
}

/**
 * 修改分类
 * @param {object} ctx 上下文
 * @param {string} id id
 * @param {string} parentId 父级id
 * @param {string} name 分类名
 * @param {string} keywords 分类关键字
 * @param {string} url 分类url
 * @param {string} enable 分类是否启用
 * @param {string} comments 分类备注
 */
async function editContentCategory(ctx, { id, parentId, name, keywords, url, enable, comments }) {
  const result = await servicesEditContentCategory({
    id,
    parentId,
    name,
    keywords,
    url,
    enable,
    comments,
  });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentCategoryFailInfo);
}

/**
 * 查询单条分类
 * @param {object} ctx 上下文
 * @param {string} id 父级id
 */
async function findOneContentCategory(ctx, { id }) {
  const result = await servicesFindOneContentCategory({
    id,
  });
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentCategoryFailInfo);
}
/**
 * 查询所有分类
 * @param {object} ctx 上下文
 */
async function findAllContentCategory(ctx) {
  const result = await servicesFindAllContentCategory();
  if (result) {
    // 修改成功
    return new SuccessModel(result);
  }
  // 修改失败;
  return new ErrorModel(addContentCategoryFailInfo);
}

module.exports = {
  addContentCategory,
  deleteContentCategory,
  editContentCategory,
  findOneContentCategory,
  findAllContentCategory,
};
