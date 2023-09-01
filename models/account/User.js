const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы users

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        required: false,
        default: 'https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Ffilkiniada-4sc.ucoz.org%2F80781_3.jpg&lr=20036&p=2&pos=14&rpt=simage&text=нет%20аватара'
    },


    name: {
        type: String,
        required: true,
    },

    secondName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    doverenostNumber: {
        type: Number,
        required: false,
        default: null
    },

    doverenostDate: {
        type: Date,
        required: false,
        default: ''
    },

    dateCreate: {
        type: Date,
        required: true,
        default: Date.now
    }
});



module.exports = mongoose.model('users', User);