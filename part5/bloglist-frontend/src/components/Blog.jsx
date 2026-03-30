import { useState, useContext } from "react";
import UserContext from "../UserContext";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBlogs, updateBlog, removeBlog, commentBlog } from "../requests";
import NotificationContext from "../NotificationContext";

const Blog = () => {
  const [visible, setVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { state, userDispatch } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const { id } = useParams();

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const newCommentMutation = useMutation({
    mutationFn: commentBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const addComment = ({id, comment}) => {
    try {
      newCommentMutation.mutate({id, comment});
      setNewComment("")
    } catch {
      showNotification({
        type: "ADD",
        message: `Token expired`,
        messageType: "error",
      });
    }
  };

  const like = ({ blog }) => {
    try {
      updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    } catch {
      showNotification({
        type: "ADD",
        message: `blog already deleted`,
        messageType: "error",
      });
    }
  };

  const deleteBlog = ({ id }) => {
    const blogToDelete = blogs.find((n) => n.id === id);
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
      )
    ) {
      try {
        deleteBlogMutation.mutate(id);
        showNotification({
          type: "ADD",
          message: `Blog deleted`,
          messageType: "success",
        });
      } catch {
        showNotification({
          type: "ADD",
          message: `Token expired`,
          messageType: "error",
        });
      }
    }
  };

  const buttonText = visible ? "hide" : "show details";

  const details = () => {
    setVisible(!visible);
  };

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) return <div>loading...</div>;

  const blog = blogs.find((b) => b.id === id);
  if (!blog) return null;
  console.log("mikäs tää on", blog);
  const deleteVisible = {
    display: state.user.id === blog.user.id ? "" : "none",
  };

  return (
    <div className="blog">
      <h1>
        {blog.title}
        {blog.author}
      </h1>
      <Link>{blog.url}</Link>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => like({ blog: blog })}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <div style={deleteVisible} className="deleteButton">
        {" "}
        <button onClick={() => deleteBlog({ id: blog.id })}>delete</button>
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={() => addComment({ id: blog.id, comment: newComment })}>
      <div>
        <label>
          title:
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </label>
      </div>
      <button type="submit">comment</button>
    </form>
    </div>
  );
};

export default Blog;
