const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/twitter-clone-api',{
    useNewUrlParser:true,
    userCreateIndex:true
})

