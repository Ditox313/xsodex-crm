const express = require('express');
const router = express.Router();
const controller = require('../../controllers/cars/cars.js');
const passport = require('passport');
const upload = require('../../middleware/upload-car-avatar.js');



// Роут на create
router.post('/create', passport.authenticate('jwt', { session: false }), upload.single('avatar'), controller.create);


// Роут на Получение всех авто
router.get('/cars-list', passport.authenticate('jwt', { session: false }), controller.getAllCars);


//Роут на удаление автомобиля
router.delete('/car-remove/:id', passport.authenticate('jwt', { session: false }), controller.remove);


// Роут на получение автомобиля по Id
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);


// Роут на update
router.patch('/update/:id', passport.authenticate('jwt', { session: false }), upload.single('avatar'), controller.update);





module.exports = router;