const ClientLaw = require('../../../models/clients/clientsLaw/ClientLaw.js');
const TrustedPersone = require('../../../models/clients/clientsLaw/TrustedPersone.js');
const Dogovor = require('../../../models/clients/clientsFiz/Dogovor.js');
const errorHandler = require('../../../Utils/errorHendler.js');
const Act = require('../../../models/bookings/Act.js');
const Pay = require('../../../models/bookings/Pay.js');
const Booking = require('../../../models/bookings/Booking.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create
module.exports.create = async function (req, res) {
    try {
        const files = req.files.files.map(file => file.path);

        const clientLaw = await new ClientLaw({
            name: req.body.name,
            type: req.body.type,
            short_name: req.body.short_name,
            inn: req.body.inn,
            kpp: req.body.kpp,
            ogrn: req.body.ogrn,
            ogrn_ip: req.body.ogrn_ip,
            svidetelstvo_ip: req.body.svidetelstvo_ip,
            law_address: req.body.law_address,
            fact_address: req.body.fact_address,
            mail_address: req.body.mail_address,
            boss_role: req.body.boss_role,
            boss_name: req.body.boss_name,
            boss_surname: req.body.boss_surname,
            boss_lastname: req.body.boss_lastname,
            osnovanie_boss_role: req.body.osnovanie_boss_role,
            phone_1: req.body.phone_1,
            phone_2: req.body.phone_2,
            email: req.body.email,
            rc_number: req.body.rc_number,
            kor_rc_number: req.body.kor_rc_number,
            bik_number: req.body.bik_number,
            name_bank: req.body.name_bank,
            user: req.user._id,
            files
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(clientLaw);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};







module.exports.getAllClientsLaw = async function (req, res) {
    try {

        const clientsLawList = await ClientLaw.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(clientsLawList);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};





// Контроллер для remove
module.exports.remove = async function (req, res) {
    try {

        const clientLaw = await ClientLaw.findOne({ _id: req.params.id });

        const dogovors = await Dogovor.deleteMany({ client: req.params.id });
        const paysList = await Pay.deleteMany({ clientId: req.params.id });
        const actsList = await Act.deleteMany({ clientId: req.params.id });
        const bookings = await Booking.deleteMany({ "client._id": req.params.id });

        clientLaw.files.forEach(file => {
            fs.unlink(file, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                }
            });
        });


        // Удаляем клиента
        const result = await ClientLaw.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 1) {
            res.status(200).json(req.params.id);
        } 
        else
        {
            res.status(200).json(req.params.id);
        }


    } catch (e) {
        errorHandler(res, e);
        return;
    }
};




// Контроллер для getById
module.exports.getById = async function (req, res) {
    try {
        const clientLaw = await ClientLaw.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(clientLaw);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};







// Контроллер для update
module.exports.update = async function (req, res) {
    try {

        const updated = req.body;
        const client = await ClientLaw.findOne({ _id: req.body._id });

       
         // Если есть загруженные файлы
         if(req.files.files && req.files.files.length > 0)
         {
             const files = req.files.files.map(file => file.path);
             updated.files = [...client.files, ...files]
         }
      



        // Находим и обновляем позицию. 
        const clientLawUpdate = await ClientLaw.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(clientLawUpdate);
    } catch (e) {
        errorHandler(res, e);
        return;
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
        const clientFiz = await ClientLaw.findOneAndUpdate({ _id: updated.client }, //Ищем по id
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
        return;
    }
};






// Получаем список договоров для клиента
module.exports.get_all_dogovorsById = async function (req, res) {
    try {

        const dogovors = await Dogovor.find({ client: req.params.id }).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Верните список договоров в ответе
        res.status(200).json(dogovors);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};




// Контроллер для remove dogovor
module.exports.remove_dogovor = async function (req, res) {
    try {

        // Ищем договор.Вытаскиваем клиента и изменяем статус договора
        const currentDogovor = await Dogovor.findById(req.params.id);
        if (currentDogovor.state === 'active') {
            // Находим клиента и обновляем статус договора
            const clientFiz = await ClientLaw.findOneAndUpdate({ _id: currentDogovor.client }, //Ищем по id
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
        return;
    }
};




// Контроллер для getById
module.exports.getDogovorById = async function (req, res) {
    try {
        const currentDogovor = await Dogovor.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(currentDogovor);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};







module.exports.search = async function (req, res) {
    try {
        const { data } = req.body.searchData;

        if (!data) {
            return res.status(400).json({ message: 'Поле data обязательно' });
        }

        const regex = new RegExp(data, 'i'); // поиск по вхождению, без ^

        const search = await ClientLaw.find({
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







// Получаем список актов дял клиеньта
module.exports.actsForClient = async function (req, res) {
    try {

        const actsList = await Act.find({ clientId: req.params.id }).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(actsList);
    } catch (e) {
        errorHandler(res, e);
        return;
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
        return;
    }
};






// Контроллер для create trusted personal
module.exports.create_trusted_persone = async function (req, res) {
    try {
        const files = req.files.files.map(file => file.path);

        const trustedPersone = await new TrustedPersone({
            name: req.body.name,
            surname: req.body.surname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            doverenostNumber: req.body.doverenostNumber,
            doverenostDate: req.body.doverenostDate,
            organization: req.body.organization,
            organizationId: req.body.organizationId,
            files
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(trustedPersone);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};




// Получаем всех доверенных лиц по организации
module.exports.getAllTrustedPersone = async function (req, res) {
    try {
        const { offset, limit, clientLawId } = req.query;

        if (!clientLawId) {
            return res.status(400).json({ message: 'clientLawId обязателен' });
        }

        const trustedPersoneList = await TrustedPersone.find({ organizationId: clientLawId })
            .sort({ date: -1 })
            .skip(+offset)
            .limit(+limit);

        res.status(200).json(trustedPersoneList);
    } catch (e) {
        errorHandler(res, e);
    }
};



// Контроллер для remove доверенного лица
module.exports.removeTrustedPersone = async function (req, res) {
    try {

        const TrustedPersoneFordelete = await TrustedPersone.findOne({ _id: req.params.id });


        TrustedPersoneFordelete.files.forEach(file => {
            fs.unlink(file, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                }
            });
        });


        // Удаляем клиента
        const result = await TrustedPersone.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 1) {
            res.status(200).json(req.params.id);
        } 
        else
        {
            res.status(200).json(req.params.id);
        }


    } catch (e) {
        errorHandler(res, e);
        return;
    }
};







// Поиск по доверенному лицу
module.exports.searchTrustedPersone = async function (req, res) {
    try {
        const { data, clientLawId } = req.body.searchData;

        // if (!data || !clientLawId) {
        //     return res.status(400).json({ message: 'Требуются data и clientLawId' });
        // }

        const search = await TrustedPersone.find({
            $and: [
                {
                    $or: [
                        { name: { $regex: new RegExp(data, 'i') } },
                        { surname: { $regex: new RegExp(data, 'i') } },
                        { lastname: { $regex: new RegExp(data, 'i') } },
                        { phone: { $regex: new RegExp(data, 'i') } },
                        { email: { $regex: new RegExp(data, 'i') } } // если есть email
                    ]
                },
                {
                    organizationId: clientLawId
                }
            ]
        })
        .limit(10)
        .exec();

        res.status(200).json(search);
    } catch (e) {
        errorHandler(res, e);
    }
};







// Получаем текущее доверенное лицо 
module.exports.getCurrentTrustedPersone = async function (req, res) {
    try {
        const trustedPersone = await TrustedPersone.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(trustedPersone);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};





// Контроллер для обновленеия доверенного лица
module.exports.updateTrustedPersone = async function (req, res) {
    try {

        const updated = req.body;
        const trustedPersone = await TrustedPersone.findOne({ _id: req.body._id });

       
         // Если есть загруженные файлы
         if(req.files.files && req.files.files.length > 0)
         {
             const files = req.files.files.map(file => file.path);
             updated.files = [...trustedPersone.files, ...files]
         }
      



        // Находим и обновляем позицию. 
        const trustedPersoneUpdate = await TrustedPersone.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(trustedPersoneUpdate);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};




