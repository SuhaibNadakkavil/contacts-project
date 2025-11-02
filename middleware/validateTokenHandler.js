const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401)
        throw new Error("Authorization header required")
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        res.status(401)
        throw new Error("Token is missing")
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401)
        throw new Error("Invalid or expired token")
    }
})

module.exports = validateToken