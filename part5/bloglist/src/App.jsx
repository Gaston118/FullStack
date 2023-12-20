import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState(null)
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    window.localStorage.clear()
    setUser(null);
    blogService.setToken(null);
  };
  

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      console.log(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError('wrong credential', exception)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const handleLike = async (blogId) => {
    try {
      const blogToLike = blogs.find(blog => blog.id === blogId);
      if (!blogToLike) {
        showError('Blog not found');
        return;
      }
      const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
  
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      );
  
      await blogService.update(blogToLike.id, updatedBlog);
  
      showNotification(`Liked ${updatedBlog.title}`);
    } catch (error) {
      console.error(error);
      showError('Error updating likes');
    }
  };

  const handleDelete = async (blogId) =>{
    try{
    const blog = blogs.find(blog => blog.id === blogId)
    if (blog && window.confirm(`Delete ${blog.title} ?`)) {
    await blogService.borrar(blogId)
    
    setBlogs(blogs.filter(blog => blog.id !== blogId))
    showNotification(`Deleted ${blog.title}`);
    }
    }catch(error){
      console.error('Error deleting person:', error);
    }
  }

  const addBlog = async (event) =>{
    event.preventDefault()
    const nameObject = {
      title: newTitle,
      author: newAuthor,
      likes: newLikes
    }
    try{
      const createBlog = await blogService.create(nameObject)
        setBlogs(blogs.concat(createBlog))
        setNewTitle('')
        setNewLikes('')
        setNewAuthor('')
        showNotification(`Added ${newTitle}`);
        console.log(createBlog)
    }
    catch(error){
      // Manejar errores de validación
      if (error.response && error.response.status === 400) {
        showError(error.response.data.error);
      } else {
        // Manejar otros errores
        console.error(error);
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='button-login' type="submit">login</button>
    </form>      
  )

  const showNotification = message => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000); // La notificación desaparecerá después de 5 segundos
  };
  
  const showError = message => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000); // La notificación desaparecerá después de 5 segundos
  };

  return (
    <div>
      <h2>blogs</h2>
      {notification && <div className="notification">{notification}</div>}
      {error && <div className="error">{error}</div>}
      {user === null ? loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="new_blog"> 
        <BlogForm 
        addBlog={addBlog}
        handleTitle={({ target }) => setNewTitle(target.value)}
        handleAuthor={({ target }) => setNewAuthor(target.value)}
        handleLikes={({ target }) => setNewLikes(target.value)}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newLikes={newLikes} />
        </Togglable>
        {blogs && sortedBlogs.map(blog =>
        <Blog key={blog.id}
         blog={blog} 
         handleLike={() => handleLike(blog.id)}
         handleDelete={() => handleDelete(blog.id)} 
         user={user}  />
        )}
      </div>
      }
    </div>
  )
}

export default App