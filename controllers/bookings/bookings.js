const Booking = require('../../models/bookings/Booking.js');
const ClientFiz = require('../../models/clients/clientsFiz/ClientFiz.js');
const ClientLaw = require('../../models/clients/clientsLaw/ClientLaw.js');
const Pay = require('../../models/bookings/Pay.js');
const Act = require('../../models/bookings/Act.js');
const errorHandler = require('../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create
module.exports.create = async function (req, res) {
    try {

        // Ищем номер последнего заказа глобального
        const lastOrder = await Booking.findOne({
            userId: req.body.userId
        })
        .sort({ date: -1 });
        // Если мы нашли предполагаемы последнйи заказ, то устанвливает поле order
        const maxOrder = lastOrder ? lastOrder.order : 0;


        const booking = await new Booking({
            booking_start: req.body.booking_start,
            booking_end: req.body.booking_end,
            booking_days: req.body.booking_days,
            car: req.body.car,
            tarif: req.body.tarif,
            tarifCheked: req.body.tarifCheked,
            zalog: req.body.zalog,
            client: req.body.client,
            place_start: req.body.place_start,
            place_start_price: req.body.place_start_price,
            place_end: req.body.place_end,
            place_end_price: req.body.place_end_price,
            arenda: req.body.arenda,
            custome_place_start: req.body.custome_place_start,
            custome_place_end: req.body.custome_place_end,
            custome_zalog: req.body.custome_zalog,
            additional_services: req.body.additional_services,
            additional_services_price: req.body.additional_services_price,
            smenaId: req.body.smenaId,
            summaFull: req.body.summaFull,
            paidCount: req.body.paidCount,
            comment: req.body.comment,
            status: req.body.status,
            sale: req.body.sale,
            userId: req.body.userId,
            order: maxOrder + 1
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(booking);
    } catch (e) {
        errorHandler(res, e);
    }
};







module.exports.getAllBookings = async function (req, res) {
    try {

        const bookingsList = await Booking.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(bookingsList);
    } catch (e) {
        errorHandler(res, e);
    }
};






module.exports.getAllClientsForSearch = async function (req, res) {
    try {

        const clientsFizList = await ClientFiz.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        const clientsLawList = await ClientLaw.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        const combinedArray = clientsFizList.concat(clientsLawList);

        // Возвращаем пользователю позиции 
        res.status(200).json(combinedArray);
    } catch (e) {
        errorHandler(res, e);
    }
};




// Контроллер на поиск
module.exports.search = async function (req, res) {
    try {
        let searchResult = [];

        // Поиск в таблице ClientFiz
        let searchFiz = await ClientFiz.find({ surname: { $regex: new RegExp('^' + req.body.searchData.data + '.*', 'i') } }).exec();
        searchFiz = searchFiz.slice(0, 10);

        // Если результат поиска в таблице ClientFiz не пустой, добавляем его в общий результат
        if (searchFiz.length > 0) {
            searchResult = searchResult.concat(searchFiz);
        } else {
            // Если результат поиска в таблице ClientFiz пустой, выполняем поиск в таблице ClientLaw
            let searchLaw = await ClientLaw.find({ name: { $regex: new RegExp('^' + req.body.searchData.data + '.*', 'i') } }).exec();
            searchLaw = searchLaw.slice(0, 10);

            // Добавляем результат поиска в таблице ClientLaw в общий результат
            searchResult = searchResult.concat(searchLaw);
        }


        res.status(200).json(searchResult);
    } catch (e) {
        errorHandler(res, e);
    }

};






// Контроллер для remove
module.exports.remove = async function (req, res) {
    try {
        // Удаляем бронь
        const result = await Booking.deleteOne({ _id: req.params.id });

        // Удаляем платежи
        const paysList = await Pay.find({ bookingId: req.params.id })
        paysList.forEach(async (pay) => {
            await Pay.deleteOne({ _id: pay._id });
        });

        // Удаляем акты
        const actsList = await Act.find({ bookingId: req.params.id })
        actsList.forEach(async (act) => {
            await Act.deleteOne({ _id: act._id });
        });

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
        const booking = await Booking.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(booking);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для create_pay
module.exports.create_pay = async function (req, res) {
    try {
        if (+req.body.pay_1.pricePay !== 0) {
            const pay_1 = await new Pay({
                type: req.body.pay_1.type,
                pricePay: req.body.pay_1.pricePay,
                typeMoney: req.body.pay_1.typeMoney,
                bookingId: req.body.pay_1.bookingId,
                smenaId: req.body.pay_1.smenaId,
                userId: req.user._id,
            }).save();
        }
        if (+req.body.pay_2.pricePay !== 0)
        {
            const pay_2 = await new Pay({
                type: req.body.pay_2.type,
                pricePay: req.body.pay_2.pricePay,
                typeMoney: req.body.pay_2.typeMoney,
                bookingId: req.body.pay_2.bookingId,
                smenaId: req.body.pay_2.smenaId,
                userId: req.user._id,
            }).save();
        }
        if (+req.body.pay_3.pricePay !== 0)
        {
            const pay_3 = await new Pay({
                type: req.body.pay_3.type,
                pricePay: req.body.pay_3.pricePay,
                typeMoney: req.body.pay_3.typeMoney,
                bookingId: req.body.pay_3.bookingId,
                smenaId: req.body.pay_3.smenaId,
                userId: req.user._id,
            }).save();
        }
        if (+req.body.pay_4.pricePay !== 0)
        {
            const pay_4 = await new Pay({
                type: req.body.pay_4.type,
                pricePay: req.body.pay_4.pricePay,
                typeMoney: req.body.pay_4.typeMoney,
                bookingId: req.body.pay_4.bookingId,
                smenaId: req.body.pay_4.smenaId,
                userId: req.user._id,
            }).save();
        }
        if (+req.body.pay_5.pricePay !== 0)
        {
            const pay_5 = await new Pay({
                type: req.body.pay_5.type,
                pricePay: req.body.pay_5.pricePay,
                typeMoney: req.body.pay_5.typeMoney,
                bookingId: req.body.pay_5.bookingId,
                smenaId: req.body.pay_5.smenaId,
                userId: req.user._id,
            }).save();
        }

        // Изменяем значение оплаченной суммы
        const summPays = (+req.body.pay_1.pricePay) + (+req.body.pay_2.pricePay) + (+req.body.pay_3.pricePay) + (+req.body.pay_4.pricePay) + (+req.body.pay_5.pricePay);
        const actualBooking = await Booking.find({ _id: req.body.pay_1.bookingId })
        const paidCountActualBooking = actualBooking[0].paidCount + (summPays);
        const updated = { paidCount: paidCountActualBooking };

        // Находим и обновляем позицию.
        const bookingUpdate = await Booking.findOneAndUpdate({ _id: req.body.pay_1.bookingId }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );


        // Находим уже обновленную бронь и отдаем ее ответом
        const actualBookingForResponce = await Booking.findOne({ _id: req.body.pay_1.bookingId })


        // Находим платежи по этой брони
        const paysList = await Pay.find({ bookingId: actualBookingForResponce._id }).sort({ date: -1 })



        //Отправляем бронь и список платежей по ней.И вносим брони и платежи в состояние
        res.status(201).json({
            actualBooking: actualBookingForResponce,
            paysList: paysList
        });
    } catch (e) {
        errorHandler(res, e);
    }
};





// Получаем платежи для брони
module.exports.paysBooking= async function (req, res) {
    try {

        const paysList = await Pay.find({bookingId: req.params.id }).sort({ date: -1 })

        res.status(200).json(paysList);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для получения клиента для акта брони
module.exports.currentClientForAct = async function (req, res) {
    try {
        const result = [];
        let client = await ClientFiz.findOne({ _id: req.params.id });
        if (!client) {
            client = await ClientLaw.findOne({ _id: req.params.id });
        }
        result.push(client);

        res.status(200).json(result[0]);
    } catch (e) {
        errorHandler(res, e);
    }
};







// Контроллер для создания акта для брони
module.exports.addActBooking = async function (req, res) {
    try {

        const act = await new Act({
            act_number: req.body.act_number,
            userId: req.body.userId,
            content: req.body.content,
            clientId: req.body.clientId,
            bookingId: req.body.bookingId,
            smenaId: req.body.smenaId
        }).save();


        res.status(201).json(act);
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


