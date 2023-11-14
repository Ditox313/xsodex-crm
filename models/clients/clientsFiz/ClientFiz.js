const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы clientFiz

const clientFizSchema = new Schema({

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

    // Дата рождения
    date_birth: {
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


    // Фактический адрес
    passport_address_fact: {
        type: String,
        default: '',
        required: false,
    },


    // Серия прав
    prava_seria: {
        type: String,
        default: '',
        required: true,
    },


    // Номер прав
    prava_number: {
        type: String,
        default: '',
        required: true,
    },


    // Дата выдачи прав
    prava_date: {
        type: String,
        default: '',
        required: true,
    },


    // Резидент
    resident: {
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

    // Телефон №2 имя
    phone_2_dop_name: {
        type: String,
        default: '',
        required: false,
    },

    // Телефон №2 номер
    phone_2_dop_number: {
        type: String,
        default: '',
        required: false,
    },


    // Телефон №3 имя
    phone_3_dop_name: {
        type: String,
        default: '',
        required: false,
    },

    // Телефон №3 номер
    phone_3_dop_number: {
        type: String,
        default: '',
        required: false,
    },



    // Телефон №4 имя
    phone_4_dop_name: {
        type: String,
        default: '',
        required: false,
    },

    // Телефон №4 номер
    phone_4_dop_number: {
        type: String,
        default: '',
        required: false,
    },



    // Телефон №5 имя
    phone_5_dop_name: {
        type: String,
        default: '',
        required: false,
    },

    // Телефон №5 номер
    phone_5_dop_number: {
        type: String,
        default: '',
        required: false,
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


    // Файл №3
    file_3: {
        type: String,
        default: '',
        required: false,
    },


    // Файл №4
    file_4: {
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


// Создаем таблицу clientsFiz
module.exports = mongoose.model('fiz-clients', clientFizSchema);