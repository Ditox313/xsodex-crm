const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const authRoutes = require('./routes/auth.js');
const keys = require('./config/keys.js');
require('./middleware/passport')(passport);





app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/auth', authRoutes);
app.use(passport.initialize());
// app.use('/uploads/cars', express.static('uploads/cars'));
// app.use('/uploads/docs', express.static('uploads/docs'));



// Подключаемся к MongoDB
mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(function() {
    console.log('Мы подключились к БД приложения!!!');
})
.catch(function(error) {
    console.log(error);
});



// Экспортируем наружу
module.exports = app;