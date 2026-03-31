import { useContext } from 'react'
import { Alert } from '@mui/material'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  if (notification.message === null) {
    return null
  }
  
  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={notification.messageType}>
    {/* <div className={notification.messageType}> */}
      {notification.message}
    {/* </div> */}
    </Alert>
  )
}

export default Notification