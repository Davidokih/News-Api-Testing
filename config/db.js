const mongoose = require('mongoose')
const url = 'mongodb://localhost/newsApi'

mongoose.connect(url).then(() => {
    console.log('connected to mongodb')
}).catch((err) => {
    console.log(err)
})
