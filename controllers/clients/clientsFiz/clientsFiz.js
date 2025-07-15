const ClientFiz = require('../../../models/clients/clientsFiz/ClientFiz.js');
const Dogovor = require('../../../models/clients/clientsFiz/Dogovor.js');
const Act = require('../../../models/bookings/Act.js');
const Pay = require('../../../models/bookings/Pay.js');
const Booking = require('../../../models/bookings/Booking.js');
const errorHandler = require('../../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create
module.exports.create = async function (req, res) {
    try {

        const files = req.files.files.map(file => file.path);

        const clientFiz = await new ClientFiz({
            name: req.body.name,
            type: req.body.type,
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
            files
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

        // Удаляем все договоры клиента при удалении
        const dogovors = await Dogovor.deleteMany({ client: req.params.id });
        const paysList = await Pay.deleteMany({ clientId: req.params.id });
        const actsList = await Act.deleteMany({ clientId: req.params.id });
        const bookings = await Booking.deleteMany({ "client._id": req.params.id });

        clientFiz.files.forEach(file => {
            fs.unlink(file, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                }
            });
        });




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
module.exports.update = async function (req, res) {
    try {

        const updated = req.body;
        const client = await ClientFiz.findOne({ _id: req.body._id });


        // Если есть загруженные файлы
        if(req.files.files && req.files.files.length > 0)
        {
            const files = req.files.files.map(file => file.path);
            updated.files = [...client.files, ...files]
        }
     



        // Находим и обновляем позицию. 
        const clientFizUpdate = await ClientFiz.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(clientFizUpdate);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для create
module.exports.create_dogovor = async function (req, res) {
    try {

        // Что бы у нас не было нескольких активных договоров.Перед слоздание каждого договора мы на всех договорах этого клиента ставим стаус неактивный
        const updated = req.body
        const dogovorsUpdateState = await Dogovor.updateMany(
            { client: updated.client },
            { state: 'no_active' }
        );


        // Находим клиента и обновляем статус договора
        const clientFiz = await ClientFiz.findOneAndUpdate({ _id: updated.client }, //Ищем по id
            { dogovor_active: 'active' },
        );


        const dogovor = await new Dogovor({
            date_start: req.body.date_start,
            dogovor_number: req.body.dogovor_number,
            date_end: req.body.date_end,
            client: req.body.client,
            administrator: req.body.administrator,
            content: req.body.content,
            state: req.body.state,
        }).save();


        res.status(201).json(dogovor);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Получаем список договоров для клиента
module.exports.get_all_dogovorsById = async function (req, res) {
    try {
        // Получите список договоров для клиента из базы данных или другого источника данных
        // const dogovors = await Dogovor.find({ client: req.params.id });

        const dogovors = await Dogovor.find({ client: req.params.id }).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Верните список договоров в ответе
        res.status(200).json(dogovors);
    } catch (e) {
        errorHandler(res, e);
    }
};




// Контроллер для remove
module.exports.remove_dogovor = async function (req, res) {
    try {
        // Ищем договор.Вытаскиваем клиента и изменяем статус договора
        const currentDogovor = await Dogovor.findById(req.params.id); 
        if (currentDogovor.state === 'active')
        {
            // Находим клиента и обновляем статус договора
            const clientFiz = await ClientFiz.findOneAndUpdate({ _id: currentDogovor.client }, //Ищем по id
                { dogovor_active: 'no_active' },
            );
        }

        // Удаляем договор
        const result = await Dogovor.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.status(200).json(req.params.id);
        } else {
            res.status(200).json('Ошибка удаления');
        }

    } catch (e) {
        errorHandler(res, e);
    }
};




// Контроллер для getById
module.exports.getDogovorById = async function (req, res) {
    try {
        const currentDogovor = await Dogovor.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(currentDogovor);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер на поиск
// module.exports.search = async function (req, res) {
//     try {

//         search = await ClientFiz.find({ surname: { $regex: new RegExp('^' + req.body.searchData.data + '.*', 'i') } }).exec();
//         search = search.slice(0, 10);

//         res.status(200).json(search);
//     } catch (e) {
//         errorHandler(res, e);
//     }

// };


module.exports.search = async function (req, res) {
    try {
        const { data } = req.body.searchData;

        if (!data) {
            return res.status(400).json({ message: 'Поле data обязательно' });
        }

        const regex = new RegExp(data, 'i'); // Поиск по вхождению, без ^

        const search = await ClientFiz.find({
            $or: [
                { surname: regex },
                { name: regex },
                { lastname: regex },
                { passport_seria: regex },
                { passport_number: regex },
                { phone_1: regex },
                { phone_2_dop_number: regex },
                { phone_3_dop_number: regex },
                { phone_4_dop_number: regex },
                { phone_5_dop_number: regex }
            ]
        })
        .limit(10)
        .exec();

        res.status(200).json(search);
    } catch (e) {
        errorHandler(res, e);
    }
};








// Получаем список актов 
module.exports.actsForClient = async function (req, res) {
    try {

        const actsList = await Act.find({ clientId: req.params.id }).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(actsList);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Получаем список броней
module.exports.bookingsForClient = async function (req, res) {
    try {

        const bookingsList = await Booking.find({ "client._id": req.params.id }).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(bookingsList);
    } catch (e) {
        errorHandler(res, e);
    }
};

