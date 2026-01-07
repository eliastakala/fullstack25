import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const addBlog = async event => {
    event.preventDefault()
    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }

      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setSuccessMessage('Blog entry created')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('token expired')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        <label>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Login successful')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <form onSubmit={addBlog}>
            <div>
              <label>
                title:
                <input
                  value={newTitle}
                  onChange={handleTitleChange}
                />
              </label>
            </div>
            <div>
              <label>
                author:
                <input
                  value={newAuthor}
                  onChange={handleAuthorChange}
                />
              </label>
            </div>
            <div>
              <label>
                url:
                <input
                  value={newUrl}
                  onChange={handleUrlChange}
                />
              </label>
            </div>
            <button type="submit">save</button>
          </form>
        </div>
      )}
      
    </div>
  )
}

export default App