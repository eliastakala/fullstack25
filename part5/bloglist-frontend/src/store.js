import { configureStore } from '@reduxjs/toolkit'

import successnotificationReducer from './reducers/successnotificationReducer'
import errornotificationReducer from './reducers/errornotificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    successnotification: successnotificationReducer,
    errornotification: errornotificationReducer,
    blogs: blogReducer,
    user: userReducer
  }
})

export default store
