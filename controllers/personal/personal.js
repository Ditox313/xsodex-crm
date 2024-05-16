const MasterPriem = require('../../models/personal/MasterPriem.js');
const errorHandler = require('../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create master-priem
module.exports.masterPriemCreate = async function (req, res) {
    try {

        const master_priem = await new MasterPriem({
            name: req.body.name,
            surname: req.body.surname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            doverenostNumber: req.body.doverenostNumber,
            doverenostDate: req.body.doverenostDate,
            user: req.user._id
        }).save();

        res.status(201).json(master_priem);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};







module.exports.getAllMastersPriem = async function (req, res) {
    try {

        const mastersPriemList = await MasterPriem.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(mastersPriemList);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};




module.exports.getAllMastersPriemNoParams = async function (req, res) {
    try {

        const mastersPriemList = await MasterPriem.find({}).sort({ date: -1 })

        // Возвращаем пользователю позиции 
        res.status(200).json(mastersPriemList);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};





// Контроллер для removeMasterPriem
module.exports.removeMasterPriem = async function (req, res) {
    try {
        // Удаляем мастера приемщика
        const result = await MasterPriem.deleteOne({ _id: req.params.id });
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




// Контроллер для getByIdMasterPriem
module.exports.getByIdMasterPriem = async function (req, res) {
    try {
        const masterPriem = await MasterPriem.findById(req.params.id); //Ищем категорию по id из переданных параметров
        res.status(200).json(masterPriem);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};







// Контроллер для update
module.exports.updateMasterPriem = async function (req, res) {
    try {

        const updated = req.body;
        
    

        // Находим и обновляем позицию. 
        const masterPriemUpdate = await MasterPriem.findOneAndUpdate({ _id: updated._id }, //Ищем по id
            { $set: updated }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(masterPriemUpdate);
    } catch (e) {
        errorHandler(res, e);
        return;
    }
};



