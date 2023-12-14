const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

//GET ALL
blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user' , { username: 1, name: 1 })
  response.json(blogs)
})

//GET ONE
blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
})

//CREAR
blogsRouter.post('/', async (request, response, next) => {
  try{
  const { title, author, likes } = request.body;
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

    if (!title || !author) {
      return response.status(400).json({ error: 'NO CONTENT' });
    }

  const blog = new Blog({
    title,
    author,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
 }catch(error){
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
 }
})

//BORRAR
blogsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  // Verificar si el usuario que intenta borrar el blog es el creador del mismo
  if (blog.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: 'forbidden, only the creator can delete the blog' })
  }

  // Eliminar el blog
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})


//UPDATE
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes
  }

  const update = await Blog.findByIdAndUpdate(request.params.id, blog)
    
  response.json(update)
  
})

module.exports = blogsRouter