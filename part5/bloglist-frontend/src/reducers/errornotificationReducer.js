import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const errornotificationSlice = createSlice({
  name: "errornotification",
  initialState,
  reducers: {
    errornotificationSet(state, action) {
      state = action.payload;
      return state;
    },
    errornotificationRemoved(state) {
      state = null;
      return state;
    },
  },
});

const { errornotificationSet, errornotificationRemoved } = errornotificationSlice.actions;

export const setErrornotification = (text, time) => {
  return async (dispatch) => {
    dispatch(errornotificationSet(text));
    setTimeout(() => {
      dispatch(errornotificationRemoved());
    }, time * 1000);
  };
};

export default errornotificationSlice.reducer;
