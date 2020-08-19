const express = require('express')
require('./database/mongoose.js')
const Account = require('./database/models/account.js')
const Tweet = require('./database/models/tweet.js')
const authMiddleware = require('./authentication/auth.js')
const { compareSync } = require('bcryptjs')
const ObjectID = require('mongodb').ObjectID

const app = express()

app.use(express.json())

app.post('/accounts',async (req,res)=>{
    const account = new Account(req.body)
    const token = await account.generateToken()

    account.tokens.push({
        token:token
    })

    try{
        await account.save()
        res.status(201)                             
        res.send({
            account:account,
            token:token
        })                    
    }
    catch (e){
        res.status(400)
        res.send({
            ErrorMessage:'Could not create new user'
        })
    } 
})

app.post('/accounts/login',async (req,res)=>{
    try{
        const account = await Account.findAccountByEmailAndPassword(req.body.email,req.body.password)
        const token = await account.generateToken()
        account.tokens.push({
            token:token
        })
        await account.save()
        res.status(200)
        res.send({
            Message:'Logged in successfully',
            token:token
        })
    }
    catch (e){
        res.status(404)
        res.send({
            ErrorMessage:e.message
        })
    }    
})

app.post('/accounts/logout',authMiddleware,async (req,res)=>{
    const account = req.account
    const token = req.token
    account.tokens.filter((tkn)=>{
        tkn!=token
    })
    await account.save()
    res.send({
        Message:'Logged out successfully'
    })
})

app.post('/accounts/logoutEverywhere',authMiddleware,async (req,res)=>{
    const account = req.account
    const token = req.token
    account.tokens=[]

    await account.save()
    res.send({
        Message:'Logged out from all sessions successfully'
    })
})

app.get('/accounts/me',authMiddleware,async (req,res)=>{
    const account = req.account
    res.send(account)
})

// app.get('/accounts/:id',authMiddleware,async (req,res)=>{
//     const account_id = req.params.id
//     try{
//         const account = await Account.findById(account_id)
//         res.send({
//             name:account.name,
//             following:account.following,
//             followers:account.followers
//         })
//     }
//     catch (e){
//         res.status(400)
//         res.send({
//             Message:'No user found'
//         })
//     }
// })

app.delete('/accounts/myAccount',authMiddleware,async (req,res)=>{
    try{
        await req.account.remove()
        res.send({
            Message:'Account deleted'
        })
    }
    catch (error)
    {
        res.status(500)
        res.send({
            Message:'Account does not exist'
        })
    }
})

app.patch('/accounts/addFollower/:id',authMiddleware,async (req,res)=>{
    const account = req.account
    const follower_id = req.params.id
    
    
    try{
        if(follower_id==account._id)
        {
            throw new Error()
        }
        const followerAccount = await Account.findById(follower_id)

        account.followers.forEach((follower)=>{
            if(follower.user_id==follower_id)
            {
                throw new Error()
            }
        })

        account.followers.push({
            user_id:followerAccount._id
        })
        await account.save()
        res.send(account)
    }
    catch (e){
        res.status(400)
            res.send({
                ErrorMessage:'error'
        })
    }
})

app.patch('/accounts/addFollowing/:id',authMiddleware,async (req,res)=>{
    const account = req.account
    const following_id = req.params.id
    
    
    try{
        if(following_id==account._id)
        {
            throw new Error()
        }
        const followingAccount = await Account.findById(following_id)

        account.following.forEach((following)=>{
            if(following.user_id==following_id)
            {
                throw new Error()
            }
        })

        account.following.push({
            user_id:followingAccount._id
        })
        await account.save()
        res.send(account)
    }
    catch (e){
        res.status(400)
            res.send({
                ErrorMessage:'error'
        })
    }
})

app.patch('/accounts/removeFollower/:id',authMiddleware,async (req,res)=>{
    const account =req.account
    const follower_id = new ObjectID(req.params.id)

    try{
        if(JSON.stringify(follower_id)==JSON.stringify(account._id))
        {
            throw new Error()
        }
        await Account.findOne({_id:follower_id})
        var flag = 0
        for(var i = 0;i<account.followers.length;i++)
        {
            if(JSON.stringify(account.followers[i].user_id)==JSON.stringify(follower_id))
            {
                flag = 1
            }
        }
        if(flag==0)
        {
            throw new Error()
        }
        account.followers = account.followers.filter((accountObject)=>{
            accountObject.user_id!=follower_id
        })
        await account.save()
        res.send(account)
    }
    catch (e){
        res.send({
            ErrorMessage:'error'
        })
    }
})

app.patch('/accounts/removeFollowing/:id',authMiddleware,async (req,res)=>{
    const account =req.account
    const following_id = new ObjectID(req.params.id)

    try{
        if(JSON.stringify(following_id)==JSON.stringify(account._id))
        {
            throw new Error()
        }
        await Account.findOne({_id:following_id})
        var flag = 0
        for(var i = 0;i<account.following.length;i++)
        {
            if(JSON.stringify(account.following[i].user_id)==JSON.stringify(following_id))
            {
                flag = 1
            }
        }
        if(flag==0)
        {
            throw new Error()
        }
        account.following = account.following.filter((accountObject)=>{
            accountObject.user_id!=following_id
        })
        await account.save()
        res.send(account)
    }
    catch (e){
        res.send({
            ErrorMessage:'error'
        })
    }
})

app.post('/tweets',authMiddleware,async (req,res)=>{
    const tweet = new Tweet({
        ...req.body,
        account:req.account._id
    })
    try{
        await tweet.save()
        res.status(201)
        res.send(tweet)
    }
    catch (e){
        res.status(400)
        res.send({
            ErrorMessage:'error'
        })
    }
})

app.delete('/tweets/:id',authMiddleware,async (req,res)=>{
    const tweet_id = req.params.id
    try{
        const tweet = await Tweet.findById(tweet_id)
        if(JSON.stringify(tweet.account)!=JSON.stringify(req.account._id))
        {
            throw new Error()
        }
        await tweet.remove()
        res.send('Tweet deleted successfully')
    }
    catch (e){
        res.status(500)
        res.send({
            ErrorMessage:'error'
        })
    }
})

app.get('/tweets',authMiddleware,async (req,res)=>{
    try{
        await req.account.populate('tweets').execPopulate()
        res.send(req.account.tweets)
    }
    catch (e){
        res.status(400)
        res.send({
            ErrorMessage:'error'
        })
    }
})

app.listen(3000,()=>{
    console.log('server is running')
})