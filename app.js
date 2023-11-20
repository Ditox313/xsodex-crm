const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/account/auth.js');
const smenaRoutes = require('./routes/smena/smena.js');
const carsRoutes = require('./routes/cars/cars.js');
const partnersRoutes = require('./routes/partners/partners.js');
const clientsFizRoutes = require('./routes/clients/clientsFiz/clientsFiz.js');
const clientsLawRoutes = require('./routes/clients/clientsLaw/clientsLaw.js');
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
app.use('/api/partners', partnersRoutes);
app.use('/api/clientsFiz', clientsFizRoutes);
app.use('/api/clientsLaw', clientsLawRoutes);
app.use(passport.initialize());
app.use('/files/users', express.static('files/users'));
app.use('/files/cars', express.static('files/cars'));
app.use('/files/partners', express.static('files/partners'));
app.use('/files/clients', express.static('files/clients'));






module.exports = app;