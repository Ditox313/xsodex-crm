const Smena = require('../../models/smena/Smena.js');
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





module.exports.getAllSmena = async function (req, res) {
    try {

        const smenaList = await Smena.find({}).sort({ open_date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(smenaList);
    } catch (e) {
        errorHandler(res, e);
    }
};
