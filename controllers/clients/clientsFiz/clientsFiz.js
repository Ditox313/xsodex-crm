const ClientFiz = require('../../../models/clients/clientsFiz/ClientFiz.js');
const errorHandler = require('../../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create
module.exports.create = async function (req, res) {
    try {
        const clientFiz = await new ClientFiz({
            name: req.body.name,
            surname: req.body.surname,
            lastname: req.body.lastname,
            date_birth: req.body.date_birth,
            passport_seria: req.body.passport_seria,
            passport_number: req.body.passport_number,
            passport_date: req.body.passport_date,
            passport_who_take: req.body.passport_who_take,
            code_podrazdeleniya: req.body.code_podrazdeleniya,
            passport_register: req.body.passport_register,
            passport_address_fact: req.body.passport_address_fact,
            prava_seria: req.body.prava_seria,
            prava_number: req.body.prava_number,
            prava_date: req.body.prava_date,
            resident: req.body.resident,
            phone_1: req.body.phone_1,
            phone_2_dop_name: req.body.phone_2_dop_name,
            phone_2_dop_number: req.body.phone_2_dop_number,
            phone_3_dop_name: req.body.phone_3_dop_name,
            phone_3_dop_number: req.body.phone_3_dop_number,
            phone_4_dop_name: req.body.phone_4_dop_name,
            phone_4_dop_number: req.body.phone_4_dop_number,
            phone_5_dop_name: req.body.phone_5_dop_name,
            phone_5_dop_number: req.body.phone_5_dop_number,
            user: req.user._id,
            file_1: req.files.file_1[0] ? req.files.file_1[0].path : '',
            file_2: req.files.file_2[0] ? req.files.file_2[0].path : '',
            file_3: req.files.file_3[0] ? req.files.file_3[0].path : '',
            file_4: req.files.file_4[0] ? req.files.file_4[0].path : '',
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(clientFiz);
    } catch (e) {
        errorHandler(res, e);
    }
};







module.exports.getAllClientsFiz = async function (req, res) {
    try {

        const clientsFizList = await ClientFiz.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(clientsFizList);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер для remove
module.exports.remove = async function (req, res) {
    try {

        const clientFiz = await ClientFiz.findOne({ _id: req.params.id });
        fs.unlink(clientFiz.file_1, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });

        fs.unlink(clientFiz.file_2, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });

        fs.unlink(clientFiz.file_3, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });

        fs.unlink(clientFiz.file_4, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });


        // Удаляем партнера
        const result = await ClientFiz.deleteOne({ _id: req.params.id });
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
module.exports.getById = async function (req, res) {
    try {
        const clientFiz = await ClientFiz.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(clientFiz);
    } catch (e) {
        errorHandler(res, e);
    }
};







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


