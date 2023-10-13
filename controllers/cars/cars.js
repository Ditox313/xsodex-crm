
const Car = require('../../models/cars/Car');
const errorHandler = require('../../Utils/errorHendler.js');




// Контроллер для create
// Контроллер для create
module.exports.create = async function (req, res) {
    try {
        const car = await new Car({
            marka: req.body.marka,
            model: req.body.model,
            number: req.body.number,
            probeg: req.body.probeg,
            transmission: req.body.transmission,
            start_arenda: req.body.start_arenda,
            end_arenda: req.body.end_arenda,
            vladelec: req.body.vladelec,
            category: req.body.category,
            status: req.body.status,
            sts_seria: req.body.sts_seria,
            sts_number: req.body.sts_number,
            sts_date: req.body.sts_date,
            osago_seria: req.body.osago_seria,
            osago_number: req.body.osago_number,
            osago_date_finish: req.body.osago_date_finish,
            vin: req.body.vin,
            kuzov_number: req.body.kuzov_number,
            color: req.body.color,
            year_production: req.body.year_production,
            price_ocenka: req.body.price_ocenka,
            to_date: req.body.to_date,
            to_probeg_prev: req.body.to_probeg_prev,
            to_probeg_next: req.body.to_probeg_next,
            to_interval: req.body.to_interval,
            oil_name: req.body.oil_name,
            stoa_name: req.body.stoa_name,
            stoa_phone: req.body.stoa_phone,
            user: req.user._id,
            avatar: req.file ? req.file.path : '', //Если файл загружен то задаем путь до файла
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(car);
    } catch (e) {
        errorHandler(res, e);
    }
};







module.exports.getAllCars = async function (req, res) {
    try {

        const carsList = await Car.find({}).sort({ open_date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(carsList);
    } catch (e) {
        errorHandler(res, e);
    }
};




