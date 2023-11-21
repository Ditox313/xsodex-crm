const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/clients/clientsLaw/clientsLaw.js');
const passport = require('passport');
const upload = require('../../../middleware/upload-clientsLaw-docs.js');



// Роут на create
router.post('/create', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }, { name: 'file_3' }, { name: 'file_4' }]), controller.create);


// Роут на Получение всех юридичексих лиц
router.get('/clientsLaw-list', passport.authenticate('jwt', { session: false }), controller.getAllClientsLaw);


//Роут на удаление юридического лица
router.delete('/clientLaw-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на получение физического лица по Id
// router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// Роут на update
// router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }]), controller.update);


// Роут на create dogovor
// router.post('/create_dogovor', passport.authenticate('jwt', { session: false }), controller.create_dogovor);



// Роут на получение всех договоров
// router.get('/get_all_dogovors/:id', passport.authenticate('jwt', { session: false }), controller.get_all_dogovorsById);


//Роут на удаление договора
// router.delete('/clientLawDogovor-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove_dogovor);


// Роут на получение договор по Id
// router.get('/delete-dogovor/:id', passport.authenticate('jwt', { session: false }), controller.getDogovorById);


// Роут на поиск
router.post('/search-client', passport.authenticate('jwt', { session: false }), controller.search);


module.exports = router;