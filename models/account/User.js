const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы users

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        required: false,
        default: 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg'
    },


    name: {
        type: String,
        required: true,
    },

    secondName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    doverenostNumber: {
        type: String,
        required: false,
        default: null
    },

    doverenostDate: {
        type: String,
        required: false,
        default: ''
    },

    dateCreate: {
        type: Date,
        required: true,
        default: Date.now
    }
});



module.exports = mongoose.model('users', User);