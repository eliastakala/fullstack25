import { useContext } from 'react'
import NotificationContext from "../NotificationContext"

const Notification = () => {
  // const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const { notification } = useContext(NotificationContext)
  
  if (notification) return (
    <div style={style}>
      {notification}
    </div>
  )
  else return null
}

export default Notification
