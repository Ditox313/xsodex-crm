
// Подключаем пакет для работы с загрузкой файлов
const multer = require('multer');

// Пакет для удобной работы с данными в js
const moment = require('moment');

const fs = require('fs');

// Транслитерация
const transliteration = require('transliteration');








// Создаем переменную storage. Она описывает как будут хранится и где будут хранится загруженный файлы. 
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const directoryPath = `files/clients/clientsLaw/docs`;
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        cb(null, `files/clients/clientsLaw/docs`);
    },

    filename(req, file, cb) {
        const date = moment().format('YYYYMMDDSSS');
        const filename = req.body.short_name + '-' + req.body.name + file.originalname
        cb(null, `${date}-${filename}`);
    }
});



// Валидатор
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};






// Лимитирование размера
const limits = {
    fileSize: 1024 * 1024 * 5
};





module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})