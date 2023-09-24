// Подключаем пакет для работы с загрузкой файлов
const multer = require('multer');

// Пакет для удобной работы с данными в js
const moment = require('moment');








// Создаем переменную storage. Она описывает как будут хранится и где будут хранится загруженный файлы. 
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'files/users');
    },
    filename(req, file, cb) {
        const date = moment().format('YYYYMMDD');
        cb(null, `${date}-${file.originalname}`);
    }
});



// Валидатор
const fileFilter = function(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
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








// // Подключаем пакет для работы с загрузкой файлов
// const multer = require('multer');

// // Пакет для удобной работы с данными в js
// const moment = require('moment');

// const fs = require('fs');








// // Создаем переменную storage. Она описывает как будут хранится и где будут хранится загруженный файлы. 
// const storage = multer.diskStorage({
//     destination(req, file, cb) {

//         // Создание директории, если она не существует
//         const directoryPath = `files/users/${req.user._id}`;
//         fs.mkdir(directoryPath, { recursive: true }, (err) => {
//             if (err) {
//                 console.error('Ошибка при создании директории:', err);
//                 cb(err);
//             } else {
//                 cb(null, directoryPath);
//             }
//         });

//         cb(null, `files/users/${req.user._id}`);
//     },
//     filename(req, file, cb) {
//         const date = moment().format('YYYYMMDDSS');
//         cb(null, `${date}-${file.originalname}`);
//     }
// });



// // Валидатор
// const fileFilter = function (req, file, cb) {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };






// // Лимитирование размера
// const limits = {
//     fileSize: 1024 * 1024 * 5
// };





// module.exports = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: limits
// })