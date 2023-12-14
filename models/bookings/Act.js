const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const bookingActSchema = new Schema({

    // Номер договора
    act_number: {
        type: String,
        required: true,
    },


    // UserId
    userId: {
        type: String,
        required: true,
    },


    //Контент
    content: {
        type: String,
        required: true,
    },


    //Id клиента
    clientId: {
        type: String,
        required: true,
    },


    //Id брони
    bookingId: {
        type: String,
        required: true,
    },

    //Smena брони
    smenaId: {
        type: String,
        required: true,
    },


    // Дата создания
    date: {
        type: Date,
        default: Date.now,
    },

});



module.exports = mongoose.model('booking_acts', bookingActSchema);