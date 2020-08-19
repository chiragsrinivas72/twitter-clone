const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    tweet:{
        type:String,
        required:true,
        maxlength:100
    },
    account:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'Account'
    }
})

const Tweet = mongoose.model('Tweet',TweetSchema)
module.exports = Tweet