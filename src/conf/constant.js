const { isProd } = require('../utils/env');
/**
 * 此集合里的配置均为示例，可自行修改
 */
module.exports = {
  SECRET: 'Tara$0729_Queens', // jwt密匙
  DEFAULT_PICTURE: 'https://dwz.cn/rnTnftZs', // 默认头像
  CRYPTO_SECRET_KEY: 'Hyominn00$Tara', // md5加密密钥
  No_Verification: ['/api/user/isExist', '/api/user/register', '/api/user/login', '/', '/public'], // 不用验证jwt的路由
  DOMAIN: isProd ? 'https://www.qingmengxuxu.xyz' : 'http://localhost:3000',
};
