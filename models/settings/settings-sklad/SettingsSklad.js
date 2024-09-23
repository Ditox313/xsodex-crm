const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы settings sklad

const settingsSkladSchema = new Schema({
    sklad_name_1:
    {
        type: String,
        required: false,
    },

    sklad_name_2:
    {
        type: String,
        required: false,
    },

    sklad_name_3:
    {
        type: String,
        required: false,
    },

    sklad_name_4:
    {
        type: String,
        required: false,
    },

    sklad_name_5:
    {
        type: String,
        required: false,
    },

    sklad_name_6:
    {
        type: String,
        required: false,
    },

    sklad_name_7:
    {
        type: String,
        required: false,
    },

    sklad_name_8:
    {
        type: String,
        required: false,
    },

    sklad_name_9:
    {
        type: String,
        required: false,
    },

    sklad_name_10:
    {
        type: String,
        required: false,
    },

    sklad_name_11:
    {
        type: String,
        required: false,
    },

    sklad_name_12:
    {
        type: String,
        required: false,
    },

    sklad_name_13:
    {
        type: String,
        required: false,
    },

    sklad_name_14:
    {
        type: String,
        required: false,
    },

    sklad_name_15:
    {
        type: String,
        required: false,
    },

    title:
    {
        type: String,
        required: false,
        default: 'Настройки склада'
    },

});


// Создаем таблицу settings
module.exports = mongoose.model('sklad-settings', settingsSkladSchema);