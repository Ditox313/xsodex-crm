const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/smena/smena.js');



// Роут на open 
router.post('/open', passport.authenticate('jwt', { session: false }), controller.open);


// Роут на проверка наличии открытой смены
router.get('/is-open-smena', passport.authenticate('jwt', { session: false }), controller.isOpenSmena);


// Роут на Получение всех смен
router.get('/smena-list', passport.authenticate('jwt', { session: false }), controller.getAllSmena);


//Роут на удаление смены
router.delete('/remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на получение смены по Id
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// // Роут на close
router.patch('/close/:id', passport.authenticate('jwt', { session: false }), controller.close);



module.exports = router;