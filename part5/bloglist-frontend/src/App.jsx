import { useState, useEffect, useContext } from "react";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import "./index.css";
import BlogList from "./components/Bloglist";
import Users from "./components/Users";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import NotificationContext from "./NotificationContext";
import { createBlog } from "./requests";
import { setToken } from "./requests";
import UserContext from "./UserContext";
import loginService from "./services/login";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);
  const { state, userDispatch } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const addBlog = async (blogObject) => {
    try {
      showNotification({
        type: "ADD",
        message: `You just created ${blogObject.title}`,
        messageType: "success",
      });
      newBlogMutation.mutate(blogObject);
    } catch {
      showNotification({
        type: "ADD",
        message: `Token expired`,
        messageType: "error",
      });
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
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON && loggedUserJSON !== "null") {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", payload: user });
      setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: "LOGIN", payload: user });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      setUsername("");
      setPassword("");
      showNotification({
        type: "ADD",
        message: `Login successful`,
        messageType: "success",
      });
    } catch {
      showNotification({
        type: "ADD",
        message: `Wrong credentials`,
        messageType: "error",
      });
    }
  };

  const padding = {
    padding: 5
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: "#CD5C5C",
  };



  return (
    <Router>
      <div style={blogStyle}>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        {state.user
          ? <em>{state.user.name} logged in <button onClick={handleLogout}>Logout</button> </em> 
          : <Link style={padding} to="/">login</Link>
          }
      </div>
      <Notification />
      <div>
        {state.user && (
          <div>
            <h2>blogs</h2>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/" element={
          <div>
            {!state.user && loginForm()}
            {state.user && (
              <div>
                <BlogList user={state.user} />
                <Togglable buttonLabel="new blog">
                  <BlogForm createBlog={addBlog} />
                </Togglable>
              </div>
            )}
          </div>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
