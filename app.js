const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/account/auth.js');
const dbConnect = require('./Utils/dbConnect.js');
const passport = require('passport');
require('./middleware/passport')(passport);
const path = require('path');



dbConnect();
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/account/auth', authRoutes);
app.use(passport.initialize());
// app.use('/uploads/cars', express.static('uploads/cars'));
// app.use('/uploads/docs', express.static('uploads/docs'));



module.exports = app;