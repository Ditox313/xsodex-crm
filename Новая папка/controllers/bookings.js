const bodyParser = require('body-parser');
const Booking = require('../models/Booking');
const Client = require('../models/Clients/Client');
const Client_Law_Fase = require('../models/Clients/Client_Law_Fase');
const Car = require('../models/Car');
const Pays = require('../models/Pays');
const errorHandler = require('../Utils/errorHendler');
const Smena = require('../models/Smena');





// Контроллер для create
module.exports.create = async function(req, res) {
    try {

        const smena = await Smena.findOne({ status: 'open' });


        // Ищем номер последнего заказа глобального
        const lastOrder = await Booking.findOne({
            user: req.user.id
        })
        .sort({ date: -1 });


        // Если мы нашли предполагаемы последнйи заказ, то устанвливает поле order
        const maxOrder = lastOrder ? lastOrder.order : 0;


        const booking = await new Booking({
            car: req.body.car ,
            client: req.body.client,
            place_start: req.body.place_start,
            place_end: req.body.place_end,
            tariff: req.body.tariff,
            comment: req.body.comment,
            booking_start: req.body.booking_start,
            booking_end: req.body.booking_end,
            booking_days: req.body.booking_days,
            summa: req.body.summa,
            summaFull: req.body.summaFull,
            status: req.body.status,
            user: req.user._id,
            order: maxOrder + 1,
            updates: [],
            dop_hours: req.body.dop_hours,
            dop_info_open: req.body.dop_info_open,
            booking_zalog: req.body.booking_zalog,
            dogovor_number__actual: req.body.dogovor_number__actual,
            booking_life_cycle: req.body.booking_life_cycle,
            smenaId: smena._id
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(booking);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер для fetch
module.exports.fetch = async function(req, res) {
    try {
        // Ищем в таблице позиции по 2 параметрам( по дефолту 1 параметр)
        const bookings = await Booking.find({
                 //Эти данные берем из объекта user который добавил пасспорт в запрос !!!
            }).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(bookings);
    } catch (e) {
        errorHandler(res, e);
    }
};










// Контроллер для update
module.exports.update = async function(req, res) {
    try {

        const updated = req.body;


        // Находим и обновляем позицию. 
        const bookingUpdate = await Booking.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(bookingUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для updateActClicked
module.exports.updateActClicked = async function (req, res) {
    try {

        const updated = req.body;

        const update = {
            $set: {
                dop_info_open: {
                    clickedAct: true,
                    clear_auto: updated.dop_info_open.clear_auto,
                    moyka: updated.dop_info_open.moyka,
                    place_start_price: updated.dop_info_open.place_start_price,
                    place_end_price: updated.dop_info_open.place_end_price,
                    additional_services_price: updated.dop_info_open.additional_services_price,
                    additional_services_chair: updated.dop_info_open.additional_services_chair,
                    additional_services_buster: updated.dop_info_open.additional_services_buster,
                    additional_services_videoregister: updated.dop_info_open.additional_services_videoregister,
                    additional_services_battery_charger: updated.dop_info_open.additional_services_battery_charger,
                    additional_services_moyka: updated.dop_info_open.additional_services_moyka,
                    additional_services_antiradar: updated.dop_info_open.additional_services_antiradar,
                    isCustomePlaceStart: updated.dop_info_open.isCustomePlaceStart,
                    isCustomeZalog: updated.dop_info_open.isCustomeZalog,
                    tarifPrice: updated.dop_info_open.tarifPrice,
                }
            },
        }



        const bookingUpdate = await Booking.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            update,
            { new: true }
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(bookingUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};


module.exports.extend = async function (req, res) {
    try {

        const updated = req.body;

        const update = {
            $set: { 
                booking_days: updated.booking_days,
                tariff: updated.tariff,
                booking_end: updated.booking_end,
                summaFull: updated.summaFull,
                summa: updated.summa,
                sale: updated.sale || 0,
                'dop_info_open.tarifPrice': updated.dop_info_open.tarifPrice
            },
            $push: { extend: updated.extend}
        }



        const bookingUpdate = await Booking.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            update, 
            { new: true } 
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(bookingUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};





module.exports.close = async function (req, res) {
    try {

        const updated = req.body;

        const update = {
            $set: {
                summaFull: updated.summaFull,
                status: updated.status,
                booking_zalog: updated.booking_zalog,
                dop_info_close: {
                    clear_auto: updated.dop_info_close.clear_auto,
                    full_tank: updated.dop_info_close.full_tank,
                    probeg_new: updated.dop_info_close.probeg_new,
                    zalog: updated.booking_zalog,
                    return_part_price: updated.dop_info_close.return_part_price || false,
                    return_part_comment: updated.dop_info_close.return_part_comment || false,
                }
            },
        }



        const bookingUpdate = await Booking.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            update,
            { new: true }
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(bookingUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для getById
module.exports.getById = async function(req, res) {
    try {
        const xsbooking = await Booking.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(xsbooking);
    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для getByIdSmena
module.exports.getByIdSmena = async function (req, res) {
    try {
        const xsbookings = await Booking.find({smenaId: req.params.id}); //Ищем категорию по id из переданных параметров
        res.status(200).json(xsbookings);
    } catch (e) {
        errorHandler(res, e);
    }
};



// Контроллер для getByIdCar
module.exports.getByIdCar = async function (req, res) {
    try {
        const xsbookings = await Booking.find({ 'car._id': req.params.id }); //Ищем категорию по id из переданных параметров
        res.status(200).json(xsbookings);
    } catch (e) {
        errorHandler(res, e);
    }
};



// Контроллер для getStatusBooking
module.exports.getStatusBooking = async function (req, res) {
    try {
        const xsbooking = await Booking.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(xsbooking);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для remove
module.exports.remove = async function(req, res) {
    try {
       


        const actualBooking = await Booking.find({ _id: req.params.id })
        const carId = await actualBooking[0].car._id


        const car = await Car.updateOne(
            { _id: carId },
            { $pull: { bookings: { _id: req.params.id } } }
        )


        await Booking.remove({
            _id: req.params.id
        });

        await Pays.remove({
            bookingId: req.params.id
        });

        // Возвращаем результат
        // res.status(200).json(actualBooking);

        res.status(200).json({
            message: "Бронь удалена"
        });
    } catch (e) {
        errorHandler(res, e);
    }
};



// Контроллер для toggleStatus
module.exports.toggleStatus = async function (req, res) {
    try {
        const updated = req.body;


        // Находим и обновляем позицию. 
        const bookingUpdate = await Booking.findOneAndUpdate({ _id: updated.bookingId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );


        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(bookingUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер на поиск
module.exports.searchWidget = async function (req, res) {
    try {

        if (req.body.searchData.type === 'fiz')
        {
            searchData = req.body.searchData.query
            xsearch = await Client.find({ surname: { $regex: new RegExp('^' + searchData + '.*', 'i') } }).exec();
            xsearch = xsearch.slice(0, 10);
        }
        else if (req.body.searchData.type === 'law')
        {
            searchData = req.body.searchData.query
            xsearch = await Client_Law_Fase.find({ name: { $regex: new RegExp('^' + searchData + '.*', 'i') } }).exec();
            xsearch = xsearch.slice(0, 10);
        }
        

        res.status(200).json(xsearch);
    } catch (e) {
        errorHandler(res, e);
    }

};




// Добавляем оплату в бронь для логирования
module.exports.update_after_booking_pay = async function (req, res) {
    try {

        const updated = req.body;


        const bookingUpdate = await Booking.updateOne(
            { _id: updated.bookingId },
            { $push: { 'booking_life_cycle.0': updated } }
        )

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(bookingUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Добавляем акт в бронь для логирования
module.exports.update_after_booking_act = async function (req, res) {
    try {

        const updated = req.body;


        const bookingUpdate = await Booking.updateOne(
            { _id: updated.bookingId },
            { $push: { 'booking_life_cycle.1': updated } }
        )

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(bookingUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Добавляем статус в бронь для логирования
module.exports.update_after_booking_status = async function (req, res) {
    try {

        const updated = req.body;


        const bookingUpdate = await Booking.updateOne(
            { _id: req.params.id },
            { $push: { 'booking_life_cycle.2': updated } }
        )

        const bookingUpdateFromResponce = await Booking.findOne(
            { _id: req.params.id },
        )

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(bookingUpdateFromResponce);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Добавляем информацию озакрытии в бронь для логирования
module.exports.update_after_booking_close = async function (req, res) {
    try {

        const updated = req.body;


        const bookingUpdate = await Booking.updateOne(
            { _id: req.params.id },
            { $push: { 'booking_life_cycle.3': updated } }
        )

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(bookingUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};