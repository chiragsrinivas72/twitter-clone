const mongoose = require('mongoose')

mongoose.connect('mongodb://host.docker.internal:27017/twitter-clone-api',{
    useNewUrlParser:true,
    userCreateIndex:true
})

