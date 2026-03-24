import { useState, useEffect, useContext } from "react";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import "./index.css";
import BlogList from "./components/Bloglist";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import NotificationContext from "./NotificationContext";
import { createBlog } from "./requests";
import { setToken } from "./requests";
import UserContext from "./UserContext";
import loginService from "./services/login";

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

  return (
    <div>
      <Notification />
      {!state.user && loginForm()}
      {state.user && (
        <div>
          <h2>blogs</h2>
          <p>
            {state.user.name} logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <BlogList user={state.user} />
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
