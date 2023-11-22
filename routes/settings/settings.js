const express = require('express');
const router = express.Router();
const controller = require('../../controllers/settings/settings.js');
const passport = require('passport');
const upload = require('../../middleware/upload-partner-docs.js');



// Роут на create
router.post('/create_setting_avtopark', passport.authenticate('jwt', { session: false }), controller.create_setting_avtopark);


// Роут на Получение всех партнеров
// router.get('/partners-list', passport.authenticate('jwt', { session: false }), controller.getAllPartners);


// Роут на Получение всех партнеров без параметров
// router.get('/partners-list-no-params', passport.authenticate('jwt', { session: false }), controller.getAllPartnersNoParams);


//Роут на удаление партнера
// router.delete('/partner-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на получение партнера по Id
// router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// Роут на update
// router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }]), controller.update);





module.exports = router;