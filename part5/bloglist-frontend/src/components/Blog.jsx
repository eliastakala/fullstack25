import { useState, useContext } from "react";
import UserContext from "../UserContext";

const Blog = ({ blog, like, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const { state, userDispatch } = useContext(UserContext);

  const deleteVisible = { display: state.user.id === blog.user.id ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonText = visible ? "hide" : "show details";

  const details = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="title-author">
        {blog.title} {blog.author}{" "}
        <button onClick={details}>{buttonText}</button>
      </div>
      {visible && (
        <div className="metaContent">
          <div className="url"> {blog.url} </div>
          <div className="likes">
            {" "}
            {blog.likes} <button onClick={like}>like</button>
          </div>
          <div className="username"> {blog.user.name} </div>
          <div style={deleteVisible} className="deleteButton">
            {" "}
            <button onClick={deleteBlog}>delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
