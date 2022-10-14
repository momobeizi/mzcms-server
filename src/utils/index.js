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

module.exports = {
  getCookie,
};
