import { createContext, useReducer } from 'react'

const initialState = {
    message: null,
    messageType: null
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        message: action.message, 
        messageType: action.messageType 
      };
    case 'REMOVE':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [ notification, notificationDispatch ] = useReducer(notificationReducer, initialState)
  const showNotification = ({type, message, messageType}) => {
    notificationDispatch({ type, message, messageType })
    setTimeout(() => {
      notificationDispatch({ type: 'REMOVE' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext