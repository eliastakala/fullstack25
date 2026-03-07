import { useSelector } from 'react-redux'

export const SuccessNotification = () => {
  const notification = useSelector(({ successnotification }) => {
    return successnotification
  })

  if (!notification) {
    return null
  }

  return <div className="success">{notification}</div>;
};
 
export const ErrorNotification = () => {
  const notification = useSelector(({ errornotification }) => {
    return errornotification
  })

  if (!notification) {
    return null
  }

  return <div className="error">{notification}</div>;
};
