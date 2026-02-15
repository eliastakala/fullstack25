import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return `You added '${action.content}'`
    case 'VOTE':
      return `You voted '${action.content}'`
    case 'NONE':
      return null
    default:
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext