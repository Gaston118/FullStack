const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
try {
  const body = request.body

  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'Username and password are required' });
}

// Verifica que tanto el nombre de usuario como la contraseña tengan al menos 3 caracteres
if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({ error: 'Username and password must be at least 3 characters long' });
}

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
    }catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    }

    // Si hay otros errores, responder con un código de estado 500 y un mensaje general
    response.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = usersRouter