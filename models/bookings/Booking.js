const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы partner

const bookingSchema = new Schema({

    
    extends: {
        type: Array,
        default: '',
        required: false,
    },


    openInfo: {
        type: Object,
        required: false,
    },

    

    closeInfo: {
        type: Object,
        required: false,
    },



    booking_start: {
        type: String,
        default: '',
        required: true,
    },

    booking_end: {
        type: String,
        default: '',
        required: true,
    },

    booking_days: {
        type: Number,
        default: '',
        required: true,
    },

    booking_days: {
        type: Number,
        default: '',
        required: true,
    },


    car: {
        type: Object,
        default: '',
        required: true,
    },


    tarif: {
        type: Object,
        default: '',
        required: true,
    },


    tarifCheked: {
        type: String,
        default: '',
        required: true,
    },


    zalog: {
        type: Number,
        default: '',
        required: true,
    },


    client: {
        type: Object,
        default: '',
        required: true,
    },


    place_start: {
        type: String,
        default: '',
        required: true,
    },


    place_start_price: {
        type: Number,
        default: '',
        required: true,
    },


    place_end: {
        type: String,
        default: '',
        required: true,
    },


    place_end_price: {
        type: Number,
        default: '',
        required: true,
    },


    arenda: {
        type: Number,
        default: '',
        required: true,
    },


    custome_place_start: {
        type: Boolean,
        default: '',
        required: true,
    },


    custome_place_end: {
        type: Boolean,
        default: '',
        required: true,
    },


    custome_zalog: {
        type: Boolean,
        default: '',
        required: true,
    },


    additional_services: {
        type: Object,
        default: '',
        required: true,
    },


    additional_services_price: {
        type: Number,
        default: '',
        required: true,
    },


    smenaId: {
        type: String,
        default: '',
        required: true,
    },


    summaFull: {
        type: Number,
        default: '',
        required: true,
    },


    paidCount: {
        type: Number,
        default: '',
        required: true,
    },


    comment: {
        type: String,
        default: '',
        required: false,
    },


    status: {
        type: String,
        default: '',
        required: true,
    },


    firma: {
        type: String,
        default: '',
        required: false,
    },


    act: {
        type: String,
        default: '',
        required: false,
    },

    sale: {
        type: Number,
        default: '',
        required: true,
    },

    overprice: {
        type: Number,
        default: '0',
        required: false,
    },


    userId: {
        type: String,
        default: '',
        required: true,
    },

    order: {
        type: Number,
        default: '',
        required: true,
    },


    masterPriem: {
        type: Object,
        default: {},
        required: false,
    },


    date: {
        type: Date,
        default: Date.now,
    },


});


// Создаем таблицу partners
module.exports = mongoose.model('bookings', bookingSchema);