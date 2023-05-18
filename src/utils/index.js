const fs = require('fs');
/**
 * @description: 从cookie里面获取token
 * @param {string} str cookie
 */
function getCookie(cookie, name) {
  let arr;
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

  if ((arr = cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

// 传入文件夹的路径看是否存在，存在不用管，不存在则直接创建文件夹
function checkDirExist(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
}
module.exports = {
  getCookie,
  checkDirExist,
};
