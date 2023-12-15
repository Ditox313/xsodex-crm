const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы pays

const paySchema = new Schema({

    // Тип платежа
    type: {
        type: String,
        required: true,
    },

    // Сумма платежа
    pricePay: {
        type: Number,
        required: true,
    },

    // Тип денег за оплату
    typeMoney: {
        type: String,
        required: true,
    },


    // Бронь ID
    bookingId: {
        type: String,
        required: true,
    },

    // Id смены
    smenaId: {
        type: String,
        required: true,
    },


    // Id user
    userId: {
        type: String,
        required: true,
    },


    // Id client
    clientId: {
        type: String,
        required: true,
    },



    
    // Дата создания
    date: {
        type: Date,
        default: Date.now,
    },



});


// Создаем таблицу cars
module.exports = mongoose.model('pays', paySchema);