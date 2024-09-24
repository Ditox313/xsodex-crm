const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const carSchema = new Schema({
    marka: {
        type: String,
        required: true,
    },

    model: {
        type: String,
        required: true,
    },

    number: {
        type: String,
        required: true,
    },

    probeg: {
        type: String,
        required: true,
    },

    transmission: {
        type: String,
        required: true,
    },

    start_arenda: {
        type: String,
        required: true,
    },

    end_arenda: {
        type: String,
        required: true,
    },

    vladelec: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    sts_seria: {
        type: String,
        required: true,
    },

    sts_number: {
        type: String,
        required: true,
    },

    sts_date: {
        type: String,
        required: true,
    },

    osago_seria: {
        type: String,
        required: true,
    },

    osago_number: {
        type: String,
        required: true,
    },

    osago_date_finish: {
        type: String,
        required: true,
    },

    vin: {
        type: String,
        required: true,
    },

    kuzov_number: {
        type: String,
        required: true,
    },

    color: {
        type: String,
        required: true,
    },

    year_production: {
        type: String,
        required: true,
    },

    price_ocenka: {
        type: String,
        required: true,
    },

    to_date: {
        type: String,
        required: true,
    },

    to_probeg_prev: {
        type: String,
        required: true,
    },

    to_probeg_next: {
        type: String,
        required: true,
    },

    to_interval: {
        type: String,
        required: true,
    },

    oil_name: {
        type: String,
        required: true,
    },

    stoa_name: {
        type: String,
        required: true,
    },

    stoa_phone: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        required: false,
        default: ''
    },


    tarif_gorod: {
        type: Array,
        required: true,
    },


    tarif_mejgorod: {
        type: Array,
        required: true,
    },

    tarif_russia: {
        type: Array,
        required: true,
    },

    komplekt: {
        type: Array,
        required: false,
    },

    
    date: {
        type: Date,
        default: Date.now,
    },

    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true
    },
});


module.exports = mongoose.model('cars', carSchema);