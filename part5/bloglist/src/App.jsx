import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

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

  const handleTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthor = (event) =>{
    setNewAuthor(event.target.value)
  }

  const handleLikes = (event) =>{
    setNewLikes(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
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
        <BlogForm 
        addBlog={addBlog}
        handleTitle={handleTitle}
        handleAuthor={handleAuthor}
        handleLikes={handleLikes}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newLikes={newLikes} />
        {blogs && blogs.map(blog =>
  <Blog key={blog.id} blog={blog} />
)}
      </div>
      }
    </div>
  )
}

export default App