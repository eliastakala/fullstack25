import { useSelector, useDispatch } from "react-redux";
// import { voteForBlog, removeBlog } from "../reducers/blogReducer";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import Blog from "./Blog";
import NotificationContext from "../NotificationContext";
import { getBlogs, updateBlog, createBlog, removeBlog } from "../requests";

const BlogList = ({ user }) => {
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);

  // const dispatch = useDispatch();

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

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
        // dispatch(removeBlog(id));
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
        <div key={blog.id}>
          <div>
            <Blog
              blog={blog}
              like={() => like({ blog: blog })}
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
