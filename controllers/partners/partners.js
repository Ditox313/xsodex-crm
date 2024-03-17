const Partner = require('../../models/partners/Partner.js');
const errorHandler = require('../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create
module.exports.create = async function (req, res) {
    try {
        const files = req.files.files.map(file => file.path);

        const partner = await new Partner({
            name: req.body.name,
            surname: req.body.surname,
            lastname: req.body.lastname,
            passport_seria: req.body.passport_seria,
            passport_number: req.body.passport_number,
            passport_date: req.body.passport_date,
            passport_who_take: req.body.passport_who_take,
            code_podrazdeleniya: req.body.code_podrazdeleniya,
            passport_register: req.body.passport_register,
            phone_1: req.body.phone_1,
            phone_2: req.body.phone_2,
            user: req.user._id,
            files
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(partner);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};







module.exports.getAllPartners = async function (req, res) {
    try {

        const partnersList = await Partner.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(partnersList);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};




module.exports.getAllPartnersNoParams = async function (req, res) {
    try {

        const partnersList = await Partner.find({}).sort({ date: -1 })

        // Возвращаем пользователю позиции 
        res.status(200).json(partnersList);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};





// Контроллер для remove
module.exports.remove = async function (req, res) {
    try {

        const partner = await Partner.findOne({ _id: req.params.id });

        partner.files.forEach(file => {
            fs.unlink(file, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                }
            });
        });
        


        // Удаляем партнера
        const result = await Partner.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.status(200).json(req.params.id);
        } else {
            return error
        }


        
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};




// Контроллер для getById
module.exports.getById = async function (req, res) {
    try {
        const car = await Partner.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(car);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};







// Контроллер для update
module.exports.update = async function (req, res) {
    try {

        const updated = req.body;
        

        // Находим партнера и добавляем картинки если они есть
        const partner = await Partner.findOne({ _id: req.body._id });
        

        // Если есть загруженные файлы
        if(req.files.files && req.files.files.length > 0)
        {
            const files = req.files.files.map(file => file.path);
            updated.files = [...partner.files, ...files]
        }
     
        


        // Находим и обновляем позицию. 
        const partnerUpdate = await Partner.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(partnerUpdate);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};



