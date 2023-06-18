require('./config/db')
const express = require('express')
const port = 1900
const App = express()
const newsRouter = require('./router/newsRouter')
const userRouter = require('./router/userRouter')

App.use(express.json())
App.use('/', newsRouter)
App.use('/', userRouter)

App.listen(port, () => {
    console.log('server is running on port ' + port)
})