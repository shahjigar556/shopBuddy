const jwt=require('jsonwebtoken')
const User = require('../models/UserModel')

const protect=async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
        console.log(`token:${token}`)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
      } catch (error) {
        console.error(error)
        res.status(401)
      }
    }
    if (!token) {
      res.status(401)
    }
  }

module.exports=protect