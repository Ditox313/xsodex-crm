const express = require('express');
const router = express.Router();
const controller = require('../../controllers/partners/partners.js');
const passport = require('passport');
const upload = require('../../middleware/upload-partner-docs.js');



// Роут на create
router.post('/create', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }]), controller.create);


// Роут на Получение всех партнеров
router.get('/partners-list', passport.authenticate('jwt', { session: false }), controller.getAllPartners);


//Роут на удаление партнера
router.delete('/partner-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на получение автомобиля по Id
// router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// Роут на update
// router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload.single('avatar'), controller.update);





module.exports = router;