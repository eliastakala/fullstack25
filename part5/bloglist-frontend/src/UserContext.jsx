import { createContext, useReducer } from 'react'

const initialState = {
    user: null
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [ state, userDispatch ] = useReducer(userReducer, initialState)
  
  return (
    <UserContext.Provider value={{ state, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext