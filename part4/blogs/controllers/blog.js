const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//GET ALL
blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
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
  const { title, author, likes } = request.body;

    if (!title || !author) {
      return response.status(400).json({ error: 'NO CONTENT' });
    }

  const blog = new Blog({
    title,
    author,
    likes: likes || 0,
  })

  const savedBlog = await blog.save()
  response.json(savedBlog)
  
})

//BORRAR
blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
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

  const update = Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    
  response.json(update)
  
})

module.exports = blogsRouter