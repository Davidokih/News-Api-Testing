const newsModel = require('../model/newsModel');
const validate = require('../validate')


const createNews = async (req, res) => {
    try {
        const { error } = validate.validateNews(req.body)
        if (error) {
            res.status(500).json({
                status: 'Fail',
                message: error.details
            })
        } else {

            const news = await newsModel.create(req.body)
            res.status(201).json({
                status: 'success',
                data: news
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

const allNews = async (req, res) => {
    try {
        const news = await newsModel.find()
        res.status(200).json({
            status: 'success',
            data: news
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

const oneNews = async (req, res) => {
    try {
        const news = await newsModel.findById(req.params.newsid)
        res.status(200).json({
            status: 'success',
            data: news
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

const updateNews = async (req, res) => {
    try {
        const { error } = validate.validateNews(req.body)
        if (error) {
            res.status(500).json({
                status: 'Fail',
                message: error.details
            })
        }
        const news = await newsModel.findByIdAndUpdate(req.params.newsid, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: news
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

const deleteNews = async (req, res) => {
    try {
        const news = await newsModel.findByIdAndDelete(req.params.newsid)
        res.status(200).json({
            status: 'success',
            data: news
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

module.exports = {
    createNews,
    allNews,
    oneNews,
    updateNews,
    deleteNews
}