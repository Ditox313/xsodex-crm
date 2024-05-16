const express = require('express');
const router = express.Router();
const controller = require('../../controllers/personal/personal.js');
const passport = require('passport');







// Роут на create
router.post('/master-priem/create', passport.authenticate('jwt', { session: false }), controller.masterPriemCreate);



// Роут на Получение всех мастеров приемщиков
router.get('/masters-priem-list', passport.authenticate('jwt', { session: false }), controller.getAllMastersPriem);


// Роут на Получение всех партнеров без параметров
// router.get('/partners-list-no-params', passport.authenticate('jwt', { session: false }), controller.getAllPartnersNoParams);


//Роут на удаление партнера
router.delete('/master-priem-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на получение партнера по Id
// router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// Роут на update
// router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'files', maxCount: 10 }]), controller.update);





module.exports = router;