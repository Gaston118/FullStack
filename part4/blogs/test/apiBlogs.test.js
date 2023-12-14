const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')

const api = supertest(app)

let authToken;  // Variable para almacenar el token

// Antes de las pruebas, obtén un token válido para las pruebas que lo requieran
beforeAll(async () => {
  const userCredentials = {
    username: 'gaston',
    password: 'gaston118',
  };

  const response = await api
  .post('/api/login')
  .send(userCredentials);

authToken = response.body.token;
console.log('Login Response:', response.body);
console.log('Generated Token:', authToken);
});

test('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 1000)

  
  test('a valid blog can be added', async () => {
    console.log("TOKEN: ", authToken)
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: "elias",
      likes: 100
    }
    const initialBlogs = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`);
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`)
  
    expect(response.body).toHaveLength(initialBlogs.body.length + 1)
  })

  test('a invalid blog can be NO added', async () => {
    const newBlog = {
      title: '',
      author: "",
      likes: 10
    }
    const initialBlogs = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`);
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400)
  
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`)
  
    expect(response.body).toHaveLength(initialBlogs.body.length)
  })

  test('missing likes property is set to 0 by default', async () => {
    const newBlog = {
      title: 'Blog Without Likes',
      author: 'John Doe',
    };
  
    const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${authToken}`);
    const savedBlog = response.body;
  
    expect(savedBlog.likes).toBeDefined();
    expect(savedBlog.likes).toBe(0);
  });

  test('a blog cannot be added without a token', async () => {
    const newBlog = {
      title: 'Invalid Blog',
      author: 'John Doe',
      likes: 5,
    };
  
    const initialBlogs = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`);
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`);
  
    expect(response.body).toHaveLength(initialBlogs.body.length);
  });
  
  

afterAll(() => {
  mongoose.connection.close()
})