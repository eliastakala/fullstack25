import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationSet(state, action) {     
      state = action.payload
      return state
    },
    notificationRemoved(state) {
      state = null
      return state
    } 
  }
})

const { notificationSet, notificationRemoved } = notificationSlice.actions

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(notificationSet(text))
    setTimeout(() => {
      dispatch(notificationRemoved())
    }, time * 1000)
  }
}

export default notificationSlice.reducer