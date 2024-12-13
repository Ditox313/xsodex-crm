const express = require('express');
const router = express.Router();
const controller = require('../../controllers/bookings/bookings.js');
const passport = require('passport');
const upload = require('../../middleware/upload-partner-docs.js');



// Роут на create
router.post('/create', passport.authenticate('jwt', { session: false }), controller.create);


// Роут на Получение всех броней
router.get('/bookings-list', passport.authenticate('jwt', { session: false }), controller.getAllBookings);


//Роут на удаление брони
router.delete('/booking-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на Получение списка клиентов для поиска
router.get('/clients-for-search-booking', passport.authenticate('jwt', { session: false }), controller.getAllClientsForSearch);


// Роут на update
router.patch('/edit/:id', passport.authenticate('jwt', { session: false }), upload.single('avatar'), controller.edit);



// Роут на Получение списка физ.лиц для поиска
// router.get('/clients-fiz-for-search-booking', passport.authenticate('jwt', { session: false }), controller.getClientsFizForSearch);


// Роут на поиск
router.post('/search-clients', passport.authenticate('jwt', { session: false }), controller.search);


// Роут на получение брони по Id
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// Роут на создание платежа
router.post('/create-pay', passport.authenticate('jwt', { session: false }), controller.create_pay);



// Роут на Получение всех платежей для брони
router.get('/pays/:id', passport.authenticate('jwt', { session: false }), controller.paysBooking);



// Роут на получение клиента для акта
router.get('/current-client-for-booking/:id', passport.authenticate('jwt', { session: false }), controller.currentClientForAct);


// Роут на создание акта для брони
router.post('/add-act-booking', passport.authenticate('jwt', { session: false }), controller.addActBooking);


// Изменяем статус брони когда авто поехало
router.get('/toggle-status-booking/:id', passport.authenticate('jwt', { session: false }), controller.toggleStatusBooking);



// Роут на получение акта
router.get('/current-act/:id', passport.authenticate('jwt', { session: false }), controller.currentAct);



// Роут на extend
router.post('/extend', passport.authenticate('jwt', { session: false }), controller.extend);



// Роут на close
router.post('/close', passport.authenticate('jwt', { session: false }), controller.close);





// Роут на update
// router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }]), controller.update);





module.exports = router;