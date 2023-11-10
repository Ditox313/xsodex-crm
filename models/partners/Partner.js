const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы partner

const partnerSchema = new Schema({

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

    // Серия паспорта
    passport_seria: {
        type: String,
        default: '',
        required: true,
    },

    // Номер паспорта
    passport_number: {
        type: String,
        default: '',
        required: true,
    },

    // Дата выдачи паспорта
    passport_date: {
        type: String,
        default: '',
        required: true,
    },

    // Кем выдан пасспорт
    passport_who_take: {
        type: String,
        default: '',
        required: true,
    },

    // Код подразделения
    code_podrazdeleniya: {
        type: String,
        default: '',
        required: true,
    },


    // Код регистрация
    passport_register: {
        type: String,
        default: '',
        required: true,
    },



    // Телефон №1
    phone_1: {
        type: String,
        default: '',
        required: true,
    },

    // Телефон №2
    phone_2: {
        type: String,
        default: '',
        required: true,
    },


    // Файл №1
    file_1: {
        type: String,
        default: '',
        required: false,
    },

    // Файл №2
    file_2: {
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


// Создаем таблицу partners
module.exports = mongoose.model('partners', partnerSchema);