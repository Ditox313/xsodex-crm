const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const dogovorSchema = new Schema({


    // Дата создания
    date_start: {
        type: String,
        required: true,
    },


    // Номер договора
    dogovor_number: {
        type: String,
        required: true,
    },

    //Дата окончания договора
    date_end: {
        type: String,
        required: true,
    },


    // Клиент
    client: {
        type: Object,
        required: true,
    },


    // Администратор
    administrator: {
        type: Object,
        required: true,
    },


    //Контент
    content: {
        type: String,
        required: true,
    },


    //Состояние
    state: {
        type: String,
        required: true,
    },


    // Дата создания
    date: {
        type: Date,
        default: Date.now,
        required: false,
    },

    

});



module.exports = mongoose.model('dogovors', dogovorSchema);