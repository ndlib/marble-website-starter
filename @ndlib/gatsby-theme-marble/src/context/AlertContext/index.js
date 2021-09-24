import React, { useContext } from 'react'
export const initialContext = {
  alerts: {},
  addAlert: () => {},
  removeAlert: () => {},
}

export const AlertContext = React.createContext(initialContext)
export const useAlertContext = () => useContext(AlertContext)
export default AlertContext
