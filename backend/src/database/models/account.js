const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AccountSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Invalid email')
            }
        }
    },
    img:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        validator(value){
            if(validator.isAlphanumeric(value)){
                throw new Error('Password should contain special characters')
            }
        }
    },
    following:[
        {
            user_id:{
                type:mongoose.Schema.Types.ObjectID,
                required:true
            }
        }
    ],
    followers:[
        {
            user_id:{
                type:mongoose.Schema.Types.ObjectID,
                required:true
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})

AccountSchema.pre('save',async function (next){
    const account = this
    if(account.isModified('password'))
    {
        account.password = await bcrypt.hash(account.password,8)
    }
    next()

})

AccountSchema.statics.findAccountByEmailAndPassword = async (email,password) =>{
    const account = await Account.findOne({email:email})
    if(!account)
    {
        throw new Error('No user found')
    }
    const isCorrectPassword = await bcrypt.compare(password,account.password)
    if(!isCorrectPassword)
    {
        throw new Error('incorrect password')
    }

    return(account)
}

AccountSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id:this._id},'secretKey')
    return(token)
}

AccountSchema.virtual('tweets',{
    ref:'Tweet',
    localField:'_id',
    foreignField:'account'
})

const Account = mongoose.model('Account',AccountSchema)

module.exports = Account