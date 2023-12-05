const express = require('express');
const router = express.Router();
const controller = require('../../controllers/bookings/bookings.js');
const passport = require('passport');
// const upload = require('../../middleware/upload-partner-docs.js');



// Роут на create
router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);


// Роут на Получение всех броней
router.get('/bookings-list', passport.authenticate('jwt', { session: false }), controller.getAllBookings);


//Роут на удаление брони
router.delete('/booking-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на Получение всех партнеров без параметров
// router.get('/partners-list-no-params', passport.authenticate('jwt', { session: false }), controller.getAllPartnersNoParams);



// Роут на получение партнера по Id
// router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// Роут на update
// router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }]), controller.update);





module.exports = router;