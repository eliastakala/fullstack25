import { configureStore } from '@reduxjs/toolkit'

import successnotificationReducer from './reducers/successnotificationReducer'
import errornotificationReducer from './reducers/errornotificationReducer'

const store = configureStore({
  reducer: {
    successnotification: successnotificationReducer,
    errornotification: errornotificationReducer
  }
})

export default store
