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

export const { notificationSet, notificationRemoved } = notificationSlice.actions
export default notificationSlice.reducer