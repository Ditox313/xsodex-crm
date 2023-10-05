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



module.exports = router;