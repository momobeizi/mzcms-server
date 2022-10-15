const Multer = require('koa-multer');
const moment = require('moment');
const UUID = require('uuid');
const { checkDirExist } = require('../utils/index');

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('sss');
    const folderName = moment().format('YYYYMMDD');
    const relativePath = `public/upload/${folderName}`;
    checkDirExist(relativePath);
    cb(null, relativePath);
  },
  filename: function (req, file, cb) {
    const fileFormat = file.originalname.split('.');
    cb(null, UUID.v1().replace(/-/g, '') + '.' + fileFormat[fileFormat.length - 1]);
  },
});
const upload = Multer({ storage: storage });

module.exports = {
  upload,
};
