const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы masters-priem

const masterPriemSchema = new Schema({

    // Имя
    name: {
        type: String,
        default: '',
        required: true,
    },

    // Фамилия
    surname: {
        type: String,
        default: '',
        required: true,
    },

    // Отчество
    lastname: {
        type: String,
        default: '',
        required: true,
    },


     // Телефон
    phone: {
        type: String,
        default: '',
        required: false,
    },

    // Номер доверенности
    doverenostNumber: {
        type: String,
        default: '',
        required: false,
    },

    // Дата выдачи довереннотси
    doverenostDate: {
        type: String,
        default: '',
        required: false,
    },



    user: {
        type: String,
        default: '',
        required: false,
    },

    // Дата создания
    date: {
        type: Date,
        default: Date.now,
    },
});


// Создаем таблицу masters-priem
module.exports = mongoose.model('masters-priem', masterPriemSchema);