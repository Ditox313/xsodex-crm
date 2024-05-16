const express = require('express');
const router = express.Router();
const controller = require('../../controllers/personal/personal.js');
const passport = require('passport');







// Роут на создание мастера приемщика
router.post('/master-priem/create', passport.authenticate('jwt', { session: false }), controller.masterPriemCreate);



// Роут на Получение всех мастеров приемщиков
router.get('/masters-priem-list', passport.authenticate('jwt', { session: false }), controller.getAllMastersPriem);


// Роут на Получение всех мастеров приемщиков без параметров
router.get('/masters-priem-list-no-params', passport.authenticate('jwt', { session: false }), controller.getAllMastersPriemNoParams);


//Роут на удаление мастера приемщика
router.delete('/master-priem-remove/:id', passport.authenticate('jwt', { session: false }), controller.removeMasterPriem);


// Роут на получение мастера приемщика по Id
router.get('/master-priem/:id', passport.authenticate('jwt', { session: false }), controller.getByIdMasterPriem);


// Роут на обновление мастера приемщика
router.patch('/master-priem/update/:id', passport.authenticate('jwt', { session: false }), controller.updateMasterPriem);





module.exports = router;