import { createContext, useReducer } from 'react'



const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat(`${action.content}`)
    case 'REMOVE':
      return state.filter(text => text.id != action.id)
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [ notification, notificationDispatch ] = useReducer(notificationReducer, [])
  const showNotification = ({content, type}) => {
    notificationDispatch({ content, type })
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