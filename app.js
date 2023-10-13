const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/account/auth.js');
const smenaRoutes = require('./routes/smena/smena.js');
const carsRoutes = require('./routes/cars/cars.js');
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
app.use('/api/smena', smenaRoutes);
app.use('/api/cars', carsRoutes);
app.use(passport.initialize());
app.use('/files/users', express.static('files/users'));
app.use('/files/cars', express.static('files/cars'));






module.exports = app;