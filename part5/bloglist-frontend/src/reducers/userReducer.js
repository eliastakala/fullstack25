import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const loginSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log("toimiiks tää ", action.payload);
      return action.payload;
    },
  },
});

const { setUser } = loginSlice.actions;

export const addUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export const signIn = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    dispatch(setUser(user));
    return user;
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
  };
};

export default loginSlice.reducer;
