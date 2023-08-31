const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
// const keys = require('./config/keys.js');
// const authRoutes = require('./routes/auth.js');
// const passport = require('passport');



// Установка максимального размера тела запроса в 50 МБ
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/auth', authRoutes);
// app.use('/uploads/cars', express.static('uploads/cars'));
// app.use('/uploads/docs', express.static('uploads/docs'));
// app.use(passport.initialize());
// require('./middleware/passport')(passport);

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