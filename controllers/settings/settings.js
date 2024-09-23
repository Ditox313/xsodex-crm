const SettingsAvtopark = require('../../models/settings/settings-avtopark/SettingsAvtopark.js')
const SettingsSklad = require('../../models/settings/settings-sklad/SettingsSklad.js')
const errorHandler = require('../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create setting avtopark
module.exports.create_setting_avtopark = async function (req, res) {
    try {
        const setting = await new SettingsAvtopark({
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






// Контроллер для create setting sklad
module.exports.create_setting_sklad = async function (req, res) {
    try {
        const setting = await new SettingsSklad({
            sklad_name_1: req.body.sklad_name_1,
            sklad_name_2: req.body.sklad_name_2,
            sklad_name_3: req.body.sklad_name_3,
            sklad_name_4: req.body.sklad_name_4,
            sklad_name_5: req.body.sklad_name_5,
            sklad_name_6: req.body.sklad_name_6,
            sklad_name_7: req.body.sklad_name_7,
            sklad_name_8: req.body.sklad_name_8,
            sklad_name_9: req.body.sklad_name_9,
            sklad_name_10: req.body.sklad_name_10,
            sklad_name_11: req.body.sklad_name_11,
            sklad_name_12: req.body.sklad_name_12,
            sklad_name_13: req.body.sklad_name_13,
            sklad_name_14: req.body.sklad_name_14,
            sklad_name_15: req.body.sklad_name_15,
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(setting);
    } catch (e) {
        errorHandler(res, e);
    }
};








// Получаем все настройки автопарка
module.exports.getAllSettingsAvtopark = async function (req, res) {
    try {

        const settingsAvtoparkList = await SettingsAvtopark.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(settingsAvtoparkList);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Получаем все настройки склада
module.exports.getAllSettingsSklad = async function (req, res) {
    try {

        const settingsSkladList = await SettingsSklad.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(settingsSkladList);
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
        const result = await SettingsAvtopark.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.status(200).json(req.params.id);
        } else {
            return error
        }


    } catch (e) {
        errorHandler(res, e);
    }
};




// Контроллер для remove settingSklad
module.exports.removeSettingSklad = async function (req, res) {
    try {

        // Удаляем settingAvtopark
        const result = await SettingsSklad.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.status(200).json(req.params.id);
        } else {
            return error
        }


    } catch (e) {
        errorHandler(res, e);
    }
};




// Контроллер для getByIdSettingsAvtopark
module.exports.getByIdSettingsAvtopark = async function (req, res) {
    try {
        const settingsAvtopark = await SettingsAvtopark.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(settingsAvtopark);
    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для getByIdSettingsSklad
module.exports.getByIdSettingsSklad = async function (req, res) {
    try {
        const settingsSklad = await SettingsSklad.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(settingsSklad);
    } catch (e) {
        errorHandler(res, e);
    }
};







// Контроллер для update setting avtopark
module.exports.updateSettingsAvtopark = async function (req, res) {
    try {

        const updated = req.body;
        // Находим и обновляем позицию. 
        const settingsAvtoparkUpdate = await SettingsAvtopark.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(settingsAvtoparkUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};




// Контроллер для update setting sklad
module.exports.updateSettingsSklad = async function (req, res) {
    try {

        const updated = req.body;
        // Находим и обновляем позицию. 
        const settingsSkladUpdate = await SettingsSklad.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(settingsSkladUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};


