import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import {
  SuccessNotification,
  ErrorNotification,
} from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));
      setSuccessMessage("Blog entry created");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch {
      setErrorMessage("token expired");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((n) => n.id === id);
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
      )
    ) {
      try {
        await blogService.deleteBlog(id); // removed the const response from here
        const rest = blogs.filter((n) => n.id !== id);
        setBlogs(rest);
        setSuccessMessage("Blog deleted");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } catch {
        setErrorMessage("token expired");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  const like = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      const response = await blogService.update(id, changedBlog);
      const newBlogs = blogs.map((blog) => (blog.id !== id ? blog : response));
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes));
    } catch {
      setErrorMessage("Already removed from server");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setSuccessMessage("Login successful");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={() => like(blog.id)}
              deleteBlog={() => deleteBlog(blog.id)}
              user={user}
            />
          ))}
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
