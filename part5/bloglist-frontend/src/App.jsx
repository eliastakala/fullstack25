import { useState, useEffect, useReducer, useContext } from "react";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, appendBlog } from "./reducers/blogReducer";
import BlogList from "./components/Bloglist";
import { addUser, signIn, signOut } from "./reducers/userReducer";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import NotificationContext from "./NotificationContext";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  // const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const addBlog = async (blogObject) => {
    try {
      showNotification({ type: 'ADD', message: `You just created ${blogObject.title}`, messageType: 'success'}),
      dispatch(appendBlog(blogObject));
    } catch {
      showNotification({ type: 'ADD', message: `Token expired`, messageType: 'error'})
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
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON && loggedUserJSON !== "null") {
      const user = JSON.parse(loggedUserJSON);
      dispatch(addUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    dispatch(signOut());
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await dispatch(signIn({ username, password }));
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      showNotification({ type: 'ADD', message: `Login successful`, messageType: 'success'})
    } catch {
      showNotification({ type: 'ADD', message: `Wrong credentials`, messageType: 'error'})
    }
  };

  return (
    <div>
      <Notification />
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
