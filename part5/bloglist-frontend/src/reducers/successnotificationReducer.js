import { createSlice } from "@reduxjs/toolkit";


const initialState = null;

const successnotificationSlice = createSlice({
  name: "successnotification",
  initialState,
  reducers: {
    successnotificationSet(state, action) {
      state = action.payload;
      return state;
    },
    successnotificationRemoved(state) {
      state = null;
      return state;
    },
  },
});

const { successnotificationSet, successnotificationRemoved } = successnotificationSlice.actions;

export const setSuccessnotification = (text, time) => {
  return async (dispatch) => {
    dispatch(successnotificationSet(text));
    setTimeout(() => {
      dispatch(successnotificationRemoved());
    }, time * 1000);
  };
};

export default successnotificationSlice.reducer;