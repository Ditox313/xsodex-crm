


const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const transliteration = require('transliteration');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const directoryPath = `files/partners/docs`;
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    cb(null, `files/partners/docs`);
  },
  filename(req, file, cb) {
    const date = moment().format('YYYYMMDDSSS');
    const filename = `${req.body.surname}-${req.body.name}-${req.body.lastname}-${file.originalname}`;
    cb(null, `${date}-${transliteration.slugify(filename)}`);
  }
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5
};

module.exports = multer({ storage, fileFilter, limits }).array('files', 10);