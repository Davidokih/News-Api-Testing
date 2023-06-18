const mongoose = require('mongoose')
const Schema = mongoose.Schema

const myNews = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timeStamps: true })

module.exports = mongoose.model('news', myNews)