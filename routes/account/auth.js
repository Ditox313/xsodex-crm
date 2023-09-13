const express = require('express');
const router = express.Router();
const controller = require('../../controllers/account/auth.js');
const passport = require('passport');



// Роут на авторизацию
router.post('/login', controller.login);

// Роут на регистрацию
router.post('/register', controller.register);


// Роут на get_user
// router.get('/user', passport.authenticate('jwt', { session: false }), controller.get_user);

// Роут на get_user_by_id
// router.get('/userById/:id', passport.authenticate('jwt', { session: false }), controller.get_user_by_ids);

// Роут на update
// router.patch('/update', passport.authenticate('jwt', { session: false }), controller.update);



module.exports = router;