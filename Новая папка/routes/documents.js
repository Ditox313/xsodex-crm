const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/documents.js');
const upload = require('../middleware/upload');



// Роут на create dogovor
router.post('/create_dogovor', passport.authenticate('jwt', { session: false }), controller.create_dogovor);


// Роут на create bookingAct
router.post('/create_booking_act', passport.authenticate('jwt', { session: false }), controller.create_booking_act);

// Роут на create report smena
router.post('/report-smena', passport.authenticate('jwt', { session: false }), controller.create_report_smena);

// Роут на getReportById
router.get('/get_report_by_id/:id', passport.authenticate('jwt', { session: false }), controller.getReportSmenaById);

// Роут на getDogovorsById
router.get('/dogovors_list/:id', passport.authenticate('jwt', { session: false }), controller.getDogovorsById);

// Роут на getActsByIdBooking
router.get('/get_acts_by_id_booking/:id', passport.authenticate('jwt', { session: false }), controller.getActsByIdBooking);

// Роут на getActById
router.get('/get_act_by_id/:id', passport.authenticate('jwt', { session: false }), controller.getActById);

// Роут на getDogovorActive
router.get('/dogovor_active/:id', passport.authenticate('jwt', { session: false }), controller.getDogovorActive);

// Роут на getDogovorById
router.get('/dogovor/:id', passport.authenticate('jwt', { session: false }), controller.getDogovorById);

// Роут на remove dogovor
router.delete('/dogovor-delete/:id', passport.authenticate('jwt', { session: false }), controller.remove_dogovor);


// Роут на remove act
router.delete('/act-delete/:id', passport.authenticate('jwt', { session: false }), controller.remove_act);

// Роут на fetch
router.get('/', passport.authenticate('jwt', { session: false }), controller.fetch);

// Роут на fetch_acts
router.get('/fetch_acts', passport.authenticate('jwt', { session: false }), controller.fetch_acts);








module.exports = router;