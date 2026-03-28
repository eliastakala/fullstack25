import { useSelector, useDispatch } from "react-redux";
// import { voteForBlog, removeBlog } from "../reducers/blogReducer";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import Blog from "./Blog";
import NotificationContext from "../NotificationContext";
import { getBlogs, updateBlog, removeBlog } from "../requests";
import { Link } from 'react-router-dom'

const BlogList = ({ user }) => {
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <div>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
