const express = require('express');
const router = express.Router();
const controller = require('../../controllers/cars/cars.js');
const passport = require('passport');
const upload = require('../../middleware/upload-car-avatar.js');



// Роут на create
router.post('/create', passport.authenticate('jwt', { session: false }), upload.single('avatar'), controller.create);


// Роут на Получение всех авто
router.get('/cars-list', passport.authenticate('jwt', { session: false }), controller.getAllCars);





module.exports = router;