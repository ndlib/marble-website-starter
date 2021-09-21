import React, { useContext } from 'react'
export const initialContext = {
  alerts: {},
  addAlerts: () => {},
}

export const AlertContext = React.createContext(initialContext)
export const useAlertContext = () => useContext(AlertContext)
export default AlertContext
