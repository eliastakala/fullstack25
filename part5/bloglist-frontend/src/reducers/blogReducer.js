import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },

    voteBlog(state, action) {
      const id = action.payload;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state
        .map((blog) => (blog.id !== id ? blog : changedBlog))
        .sort((a, b) => b.likes - a.likes);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { setBlogs, createBlog, voteBlog, deleteBlog } = blogSlice.actions;

export const voteForBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const blogToChange = blogs.find((n) => n.id === id);
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    };
    await blogService.update(id, changedBlog);
    dispatch(voteBlog(id));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogs));
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    console.log('content', content)
    const newBlog = await blogService.create(content);
    dispatch(createBlog(newBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
