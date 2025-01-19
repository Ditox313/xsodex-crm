const Smena = require('../../models/smena/Smena.js');
const Pay = require('../../models/bookings/Pay.js');
const errorHandler = require('../../Utils/errorHendler.js');





module.exports.open = async function(req, res) {
    try {

        const lastOrderSmena = await Smena.findOne({}).sort({ _id: -1 });
        const maxOrder = lastOrderSmena ? lastOrderSmena.order : 0;



        const smena = await new Smena({
            open_date: req.body.open_date,
            responsible_name: req.body.responsible_name,
            responsible_secondName: req.body.responsible_secondName,
            responsible_lastName: req.body.responsible_lastName,
            status: req.body.status,
            close_date: req.body.close_date,
            userId: req.body.userId,
            order: maxOrder + 1
        }).save();
        

        res.status(201).json(smena);
    } catch (e) {
        errorHandler(res, e);
    }
};




module.exports.isOpenSmena = async function (req, res) {
    try {

        const smena = await Smena.findOne({ status: 'open' });


        res.status(201).json(smena);
    } catch (e) {
        errorHandler(res, e);
    }
};




// Получаем список смен
module.exports.getAllSmena = async function (req, res) {
    try {

        const smenaList = await Smena.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(smenaList);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Получаем платежи для смены
module.exports.getAllSmenaPays = async function (req, res) {
    try {
        const smenaId = req.params.id; 

        const paysList = await Pay.find({ smenaId: smenaId }) 

        res.status(200).json(paysList);
    } catch(e) {
        errorHandler(res, e);
    }
};




// Получаем платежи для генерального отчета
module.exports.getAllPaysForGeneralReport = async function (req, res) {
    try {
        const paysList = await Pay.find();
        res.status(200).json(paysList);
    } catch(e) {
        errorHandler(res, e);
    }
};






// Контроллер для remove
module.exports.remove = async function (req, res) {
    try {
        const result = await Smena.deleteOne({ _id: req.params.id });

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
        const smena = await Smena.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(smena);
    } catch (e) {
        errorHandler(res, e);
    }
};



// Контроллер для close
module.exports.close = async function (req, res) {
    try {

        const smena = await Smena.updateMany(
            { _id: req.params.id }, // выбираем объект и элемент массива по соответствующим ID
            { $set: { "status": 'close', "close_date": req.body.close_date} }
        );

        // Возвращаем результат
        res.status(200).json(smena);
    } catch (e) {
        errorHandler(res, e);
    }
};