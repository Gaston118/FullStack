const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

  
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: "elias",
      likes: 100
    }
    const initialBlogs = await api.get('/api/blogs');
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.body.length + 1)
    expect(title).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('a invalid blog can be NO added', async () => {
    const newBlog = {
      title: '',
      author: "",
      likes: 10
    }
    const initialBlogs = await api.get('/api/blogs');
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.body.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    
    const blogToView = Object.values(blogsAtStart.body)[0];
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedNoteToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedNoteToView)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await api.get("/api/blogs")
    const blogToDelete = Object.values(blogsAtStart.body)[0];
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await api.get("/api/blogs")
  
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)
  
    //const contents = blogsAtEnd.body.map(r => r.title)
  
    //expect(contents).not.toContain(blogToDelete.title)
  })

  test('blog posts have id property instead of _id', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
  
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });

  test('missing likes property is set to 0 by default', async () => {
    const newBlog = {
      title: 'Blog Without Likes',
      author: 'John Doe',
    };
  
    const response = await api.post('/api/blogs').send(newBlog);
    const savedBlog = response.body;
  
    expect(savedBlog.likes).toBeDefined();
    expect(savedBlog.likes).toBe(0);
  });
  

afterAll(() => {
  mongoose.connection.close()
})