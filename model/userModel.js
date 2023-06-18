const mongoose = require('mongoose')
const Schema = mongoose.Schema

const myUser = Schema({
    fullName: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timeStamps: true })

module.exports = mongoose.model('user', myUser)