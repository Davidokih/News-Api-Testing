const express = require('express')
const newsRouter = express.Router()

const { createNews,
    allNews,
    oneNews,
    updateNews,
    deleteNews } = require('../handler/newsHandler')

newsRouter.post('/news', createNews)
newsRouter.get('/news', allNews)
newsRouter.get('/news/:newsid', oneNews)
newsRouter.patch('/news/:newsid', updateNews)
newsRouter.delete('/news/:newsid', deleteNews)

module.exports = newsRouter