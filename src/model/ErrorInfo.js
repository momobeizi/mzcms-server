// 操作失败code和message

module.exports = {
  // 用户名已存在
  registerUserNameExistInfo: {
    code: 10001,
    message: '用户名已存在',
  },
  // 注册失败
  registerFailInfo: {
    code: 10002,
    message: '注册失败，请重试',
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    code: 10003,
    message: '用户名未存在',
  },
  // 登录失败
  loginFailInfo: {
    code: 10004,
    message: '登录失败，用户名或密码错误',
  },
  // 未登录
  loginCheckFailInfo: {
    code: 10005,
    message: '您尚未登录',
  },
  // 修改密码失败
  changePasswordFailInfo: {
    code: 10006,
    message: '修改密码失败，请重试',
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    code: 10007,
    message: '上传文件尺寸过大',
  },
  // 修改基本信息失败
  changeInfoFailInfo: {
    code: 10008,
    message: '修改基本信息失败',
  },
  // json schema 校验失败
  jsonSchemaFileInfo: {
    code: 10009,
    message: '数据格式校验错误',
  },
  // 修改密码失败
  deleteUserFailInfo: {
    code: 10010,
    message: '删除用户失败',
  },
  // 添加类别失败
  addContentCategoryFailInfo: {
    code: 10011,
    message: '添加类别失败',
  },
  // 添加类别失败
  addContentFailInfo: {
    code: 10012,
    message: '操作文章失败',
  },
  // 文件上传失败
  uploadFailInfo: {
    code: 10013,
    message: '文件上传失败',
  },
  // 里程修改失败
  addOdometerFailInfo: {
    code: 10014,
    message: '里程修改失败',
  },
  // 里程列表查询失败
  findOdometerListFailInfo: {
    code: 10015,
    message: '里程列表查询失败',
  },
};
