const ClientLaw = require('../../../models/clients/clientsLaw/ClientLaw.js');
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
            file_1: req.files.file_1[0] ? req.files.file_1[0].path : '',
            file_2: req.files.file_2[0] ? req.files.file_2[0].path : '',
            file_3: req.files.file_3[0] ? req.files.file_3[0].path : '',
            file_4: req.files.file_4[0] ? req.files.file_4[0].path : '',
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(clientLaw);
    } catch (e) {
        errorHandler(res, e);
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
    }
};





// Контроллер для remove
module.exports.remove = async function (req, res) {
    try {

        const clientLaw = await ClientLaw.findOne({ _id: req.params.id });

        const dogovors = await Dogovor.deleteMany({ client: req.params.id });
        const paysList = await Pay.deleteMany({ clientId: req.params.id });
        const actsList = await Act.deleteMany({ clientId: req.params.id });

        fs.unlink(clientLaw.file_1, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });

        fs.unlink(clientLaw.file_2, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });

        fs.unlink(clientLaw.file_3, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });

        fs.unlink(clientLaw.file_4, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
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
    }
};




// Контроллер для getById
module.exports.getById = async function (req, res) {
    try {
        const clientLaw = await ClientLaw.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(clientLaw);
    } catch (e) {
        errorHandler(res, e);
    }
};







// Контроллер для update
module.exports.update = async function (req, res) {
    try {

        const updated = req.body;
        const client = await ClientLaw.findOne({ _id: req.body._id });

        // Если объект file есть,то заполняем параметр путем фала
        if (req.files.file_1) {
            fs.unlink(client.file_1, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                }
            });

            updated.file_1 = req.files.file_1[0] ? req.files.file_1[0].path : '';
        }

        // Если объект file есть,то заполняем параметр путем фала
        if (req.files.file_2) {
            fs.unlink(client.file_2, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                }
            });

            updated.file_2 = req.files.file_2[0] ? req.files.file_2[0].path : '';
        }

        // Если объект file есть,то заполняем параметр путем фала
        if (req.files.file_3) {
            fs.unlink(client.file_3, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                }
            });

            updated.file_3 = req.files.file_3[0] ? req.files.file_3[0].path : '';
        }


        // Если объект file есть,то заполняем параметр путем фала
        if (req.files.file_4) {
            fs.unlink(client.file_4, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                }
            });

            updated.file_4 = req.files.file_4[0] ? req.files.file_4[0].path : '';
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
module.exports.search = async function (req, res) {
    try {

        search = await ClientLaw.find({ name: { $regex: new RegExp('^' + req.body.searchData.data + '.*', 'i') } }).exec();
        search = search.slice(0, 10);

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
