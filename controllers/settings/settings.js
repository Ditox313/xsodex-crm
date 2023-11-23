const SettingsFvtopark = require('../../models/settings/settings-avtopark/SettingsAvtopark.js')
const errorHandler = require('../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create setting avtopark
module.exports.create_setting_avtopark = async function (req, res) {
    try {
        const setting = await new SettingsFvtopark({
            share_avto: req.body.share_avto,
            input_avto: req.body.input_avto,
            washing_avto: req.body.washing_avto,
            additionally_avto: req.body.additionally_avto,
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(setting);
    } catch (e) {
        errorHandler(res, e);
    }
};








module.exports.getAllSettingsAvtopark = async function (req, res) {
    try {

        const settingsAvtoparkList = await SettingsFvtopark.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(settingsAvtoparkList);
    } catch (e) {
        errorHandler(res, e);
    }
};




// module.exports.getAllPartnersNoParams = async function (req, res) {
//     try {

//         const partnersList = await Partner.find({}).sort({ date: -1 })

//         // Возвращаем пользователю позиции 
//         res.status(200).json(partnersList);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };





// Контроллер для remove settingAvtopark
module.exports.removeSettingAvtopark = async function (req, res) {
    try {

        // Удаляем settingAvtopark
        const result = await SettingsFvtopark.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.status(200).json(req.params.id);
        } else {
            return error
        }


    } catch (e) {
        errorHandler(res, e);
    }
};




// Контроллер для getById
// module.exports.getById = async function (req, res) {
//     try {
//         const car = await Partner.findById(req.params.id); //Ищем категорию по id из переданных параметров
//         res.status(200).json(car);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };







// Контроллер для update
// module.exports.update = async function (req, res) {
//     try {

//         const updated = req.body;



//         // Если объект file есть,то заполняем параметр путем фала
//         if (req.files.file_1) {
//             // Находим нужный автомобиль и удаляем аватарку автомобиля
//             const partner = await Partner.findOne({ _id: req.body._id });
//             fs.unlink(partner.file_1, (err) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Ошибка при удалении картинки' });
//                 }
//             });

//             updated.file_1 = req.files.file_1[0] ? req.files.file_1[0].path : '';
//         }

//         // Если объект file есть,то заполняем параметр путем фала
//         if (req.files.file_2) {
//             // Находим нужный автомобиль и удаляем аватарку автомобиля
//             const partner = await Partner.findOne({ _id: req.body._id });
//             fs.unlink(partner.file_2, (err) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Ошибка при удалении картинки' });
//                 }
//             });

//             updated.file_2 = req.files.file_2[0] ? req.files.file_2[0].path : '';
//         }



//         // Находим и обновляем позицию. 
//         const partnerUpdate = await Partner.findOneAndUpdate({ _id: updated._id }, //Ищем по id
//             { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
//             { new: true } //обновит позицию и верет нам уже обновленную
//         );

//         // Возвращаем пользователю обновленную позицию 
//         res.status(200).json(partnerUpdate);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// };


