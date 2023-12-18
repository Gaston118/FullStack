const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

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
blogsRouter.post('/', userExtractor,async (request, response, next) => {
  try{
  const { title, author, likes } = request.body;
  const user = request.user
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
  else if(error.name === "Invalid token"){
    return response.status(401).json({error: "token invalido"})
  }
 }
})

//BORRAR
blogsRouter.delete('/:id', userExtractor,async (request, response) => {
  
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  // Verificar si el usuario que intenta borrar el blog es el creador del mismo
  if (blog.user.toString() !== user.id) {
    return response.status(403).json({ error: 'forbidden, only the creator can delete the blog' })
  }

  // Eliminar el blog
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})


//UPDATE
blogsRouter.put('/:id', userExtractor,async (request, response, next) => {
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