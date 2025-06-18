const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы settings avtopark

const settingsGlobalSchema = new Schema({
    firma: String,
    rekviziti_firma_1: String,
    rekviziti_firma_2: String,
    title:
    {
        type: String,
        required: false,
        default: 'Глобальные настройки'
    },
});


// Создаем таблицу settings
module.exports = mongoose.model('global-settings', settingsGlobalSchema);