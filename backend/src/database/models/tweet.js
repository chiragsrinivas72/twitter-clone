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
    },
    no_of_likes: {
        type:Number
    },
    liked_by: [
        {
            user_id: {
                type:mongoose.Schema.Types.ObjectID,
                required:true
            }
        }
    ],
    tweet_date:{
        type:Date
    }
})

const Tweet = mongoose.model('Tweet',TweetSchema)
module.exports = Tweet