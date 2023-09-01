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



module.exports = mongoose.model('Users', User);