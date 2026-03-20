import { useSelector, useDispatch } from "react-redux";
import { voteForBlog, removeBlog } from "../reducers/blogReducer";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useContext } from "react";
import Blog from "./Blog";
import NotificationContext from "../NotificationContext";

const BlogList = ({ user }) => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const dispatch = useDispatch();
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const like = ({ id }) => {
    try {
      dispatch(voteForBlog(id));
    } catch {
      showNotification({ type: 'ADD', message: `blog already deleted`, messageType: 'error'})
    }
  };

  const deleteBlog = ({ id }) => {
    const blogToDelete = blogs.find((n) => n.id === id)
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
      )
    ) {
      try {
        dispatch(removeBlog(id));
        showNotification({ type: 'ADD', message: `Blog deleted`, messageType: 'success'})
      } catch {
        showNotification({ type: 'ADD', message: `Token expired`, messageType: 'error'})
      }
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div>
            <Blog
              blog={blog}
              like={() => like({ id: blog.id })}
              deleteBlog={() => deleteBlog({ id: blog.id })}
              user={user}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
