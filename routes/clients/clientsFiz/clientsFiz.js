const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/clients/clientsFiz/clientsFiz.js');
const passport = require('passport');
const upload = require('../../../middleware/upload-clientsFiz-docs.js');



// Роут на create
router.post('/create', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }, { name: 'file_3' }, { name: 'file_4' }]), controller.create);


// Роут на Получение всех физических лиц
router.get('/clientsFiz-list', passport.authenticate('jwt', { session: false }), controller.getAllClientsFiz);


//Роут на удаление физического лица
router.delete('/clientFiz-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на получение партнера по Id
// router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// Роут на update
// router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }]), controller.update);





module.exports = router;