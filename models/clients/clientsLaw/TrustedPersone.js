const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы clients

const trustedPersoneSchema = new Schema({


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
        required: true,
    },


    // Дата доверенности
    doverenostDate: {
        type: String,
        default: '',
        required: true,
    },


     // Номер доверенности
    doverenostNumber: {
        type: String,
        default: '',
        required: true,
    },


    // Организация
    organization: {
        type: String,
        default: '',
        required: true,
    },


    // ID организации
    organizationId: {
        type: String,
        default: '',
        required: true,
    },


    
    // Файлы
    files: {
        type: Array,
        required: false,
    },



    // Дата создания
    date: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('trusted-persones', trustedPersoneSchema);