const express = require('express');
const router = express.Router();
const controller = require('../../controllers/account/auth.js');
const passport = require('passport');
const upload = require('../../middleware/upload-account-user-img.js');



// Роут на авторизацию
router.post('/login', controller.login);

// Роут на регистрацию
router.post('/register', controller.register);

// Роут на updateUser
router.patch('/updateUser', passport.authenticate('jwt', { session: false }), upload.single('avatar'), controller.updateUser);



module.exports = router;