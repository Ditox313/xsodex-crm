const mongoose = require('mongoose');
const keys = require('../config/keys');

module.exports = function(){
    // Подключаемся к MongoDB
    mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function () {
        console.log('Мы подключились к БД приложения!!!');
    })
    .catch(function (error) {
        console.log(error);
    });
};