const jwt = require('jsonwebtoken')
const Account = require('../database/models/account.js')

const authMiddleware = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const account_id = jwt.verify(token,'secretKey')._id
        const account = await Account.findOne({_id:account_id})
        req.account = account
        req.token = token
        next()
    }
    catch (e){
        res.send({
            ErrorMessage:'Access denied'
        })
    }
}

module.exports = authMiddleware