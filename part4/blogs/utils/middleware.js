const User = require('../models/user')
const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    } else {
      request.token = null
    }
  
    next()
  }

const userExtractor = async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(401).json({ error: 'User not found' })
    }

    request.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'Invalid token' })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({ error: 'Token expired' })
    } else {
      next(error)
    }
  }
}

  module.exports ={
    userExtractor,
    tokenExtractor
  } 
  