const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы settings avtopark

const settingsAvtoparkSchema = new Schema({
    share_avto:
    {
        type: Object,
        required: true,
    },

    input_avto:
    {
        type: Object,
        required: true,
    },

    washing_avto:
    {
        type: Object,
        required: true,
    },

    additionally_avto:
    {
        type: Object,
        required: true,
    },

    title:
    {
        type: String,
        required: false,
        default: 'Настройки автороката'
    },
});


// Создаем таблицу settings
module.exports = mongoose.model('avtopark-settings', settingsAvtoparkSchema);