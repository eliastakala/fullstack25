import { useState, useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import {
  SuccessNotification,
  ErrorNotification,
} from "./components/Notification";
import blogService from "./services/blogs";
import { setSuccessnotification } from './reducers/successnotificationReducer'
import { setErrornotification } from './reducers/errornotificationReducer'
import "./index.css";
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, appendBlog } from "./reducers/blogReducer";
import BlogList from "./components/Bloglist";
import { addUser, signIn, signOut } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.user
  })
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const addBlog = async (blogObject) => {
    try {
      dispatch(appendBlog(blogObject))
      dispatch(setSuccessnotification(`You created something ${blogObject.title}`, 5))
    } catch {
      dispatch(setErrornotification(`token expired`, 5))
    }
  };

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
  );

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON && loggedUserJSON !== "null") {
      console.log('loggedUserJSON', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON);
      dispatch(addUser(user))
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogout = () => {
    dispatch(signOut())
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const result = await dispatch(signIn({ username, password }))
    console.log('dispatch result:', result)
    console.log('type:', typeof result)
    try {
      const user = await dispatch(signIn({ username, password }))
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      dispatch(setSuccessnotification(`Login successful`, 5))
      console.log('user', user)
    } catch {
      dispatch(setErrornotification(`wrong credentials`, 5))
    }
  };

  return (
    <div>
      <ErrorNotification />
      <SuccessNotification />
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <BlogList user={user} />
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
