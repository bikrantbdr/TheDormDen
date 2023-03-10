const jwt = require('jsonwebtoken');
const { CreateError } = require('./CreateError');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(CreateError("You are not authenticated!", 401))
    
    try {
        const user = jwt.verify(token, process.env.SECRET)
        req.user = user
        next()
    } catch (error) {
        next(CreateError("Token is not valid!", 401))
    }
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if ((req.user.id.toString() === req.params.id.toString()) || req.user.isAdmin) {
            next()
        } else {
            return next(CreateError("You are not allowed to perform this action!", 403))
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(CreateError("You are not allowed to perform this action!", 403))
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }


