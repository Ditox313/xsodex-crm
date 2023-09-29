const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/smena/smena.js');



// Роут на open 
router.post('/open', passport.authenticate('jwt', { session: false }), controller.open);


// Роут на isOpenSmena
router.get('/is-open-smena', passport.authenticate('jwt', { session: false }), controller.isOpenSmena);



module.exports = router;