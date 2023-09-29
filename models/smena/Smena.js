const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы Smena

const smenaSchema = new Schema({

    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true,
    },
    

    open_date: {
        type: String,
        required: true,
    },

    responsible_name: {
        type: String,
        required: true,
    },

    responsible_secondName: {
        type: String,
        required: true,
    },

    responsible_lastName: {
        type: String,
        required: true,
    },


    status: {
        type: String,
        required: true,
    },


    close_date: {
        type: String,
        required: false,
    },


    order: {
        type: String,
        required: true,
    },


});


// Создаем таблицу cars
module.exports = mongoose.model('smena', smenaSchema);