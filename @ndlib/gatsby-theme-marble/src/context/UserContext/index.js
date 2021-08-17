import React, { useContext } from 'react'
export const initialContext = { user: {}, setUser: () => {} }
export const UserContext = React.createContext({
  user: {},
  setUser: () => {},
})
export const useUserContext = () => useContext(UserContext)
export default UserContext
