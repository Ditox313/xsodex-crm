const Smena = require('../../models/smena/Smena.js');
const errorHandler = require('../../Utils/errorHendler.js');





module.exports.open = async function(req, res) {
    try {

        const lastOrderSmena = await Smena.findOne({}).sort({ date: -1 });
        const maxOrder = lastOrderSmena ? lastOrderSmena.order : 0;



        const smena = await new Smena({
            open_date: req.body.open_date,
            responsible: req.body.responsible,
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