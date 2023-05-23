// const {
//   servicesAddContentCategory,
//   servicesDeleteContentCategory,
//   servicesEditContentCategory,
//   servicesFindOneContentCategory,
//   servicesFindAllContentCategory,
// } = require('../services/contentCategory');
const { DOMAIN } = require('../../conf/constant');
const { SuccessModel, ErrorModel } = require('../../model/ResModel');
const { uploadFailInfo } = require('../../model/ErrorInfo');
const send = require('koa-send');

/**
 * 上传文件
 * @param {object} ctx 上下文
 */
async function uploadFile(ctx) {
  console.log(ctx.req.files);
  let result = [];
  if (ctx.req.files.file.length > 1) {
    ctx.req.files.file.forEach((item) => {
      result.push(`${DOMAIN}${item.destination.slice(6)}/${item.filename}`);
    });
  } else {
    result = `${DOMAIN}${ctx.req.files.file[0].destination.slice(6)}/${
      ctx.req.files.file[0].filename
    }`;
  }
  console.log(result);
  if (result) {
    // 上传成功
    return new SuccessModel(result);
  }
  // 上传失败;
  return new ErrorModel(uploadFailInfo);
}

/**
 * 下载大文件
 * @param {object} ctx 上下文
 */
async function downloadBigFile(ctx) {
  const filePath = 'public/upload/20221022/big.zip';
  ctx.attachment(filePath);
  await send(ctx, filePath);
}
module.exports = {
  uploadFile,
  downloadBigFile,
};
