import { useSelector, useDispatch } from "react-redux";
import { voteForBlog, removeBlog } from "../reducers/blogReducer";
import { setErrornotification } from "../reducers/errornotificationReducer";
import { setSuccessnotification } from "../reducers/successnotificationReducer";

import Blog from "./Blog";

const BlogList = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const like = ({ id }) => {
    dispatch(voteForBlog(id));
  };

  const deleteBlog = ({ id }) => {
    console.log('id poistamassa', id)
    const blogToDelete = blogs.find((n) => n.id === id)
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
      )
    ) {
      try {
        dispatch(removeBlog(id));
        dispatch(setSuccessnotification(`Blog deleted`, 5));
      } catch {
        dispatch(setErrornotification(`token expired`, 5));
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
