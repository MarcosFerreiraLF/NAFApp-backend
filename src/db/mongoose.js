const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/nafapp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

console.log('Connected to db')