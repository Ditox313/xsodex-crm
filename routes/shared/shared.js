const express = require('express');
const router = express.Router();
const controller = require('../../controllers/shared/shared.js');
const passport = require('passport');

// Удаление файла
router.post('/delete_file', passport.authenticate('jwt', { session: false }), controller.delete_file);




module.exports = router;