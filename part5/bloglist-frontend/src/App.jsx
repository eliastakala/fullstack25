import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newBlog
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog('')
    })
  }

  const loginForm = () => (
    
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
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
    } catch {
      console.log('wrong credentials')
    }
  }

  const handleBlogChange = event => {
    setNewBlog(event.target.value)
  }

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <form onSubmit={addBlog}>
            <input value={newBlog} onChange={handleBlogChange} />
            <button type="submit">save</button>
          </form>
        </div>
      )}
      
    </div>
  )
}

export default App