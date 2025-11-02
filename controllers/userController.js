const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async (req, res) =>{
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("all fields are required");
    }
    const userAvailable = await User.findOne({email})
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id, 
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error("User data not valid");
    }
})

const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("email and password are required");
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email and password is not valid");
    }
})

const currentUser = asyncHandler(async (req, res) =>{
    res.json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}