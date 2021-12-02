import React, { useContext } from 'react'
export const initialContext = {
  portfoioUser: {},
  updatePortfolioUser: () => {},
  isPortfolioOwner: () => false,
  portfolioUserLoading: () => {},
  removeUserPortfolio: () => {},
  createNewPortfolio: () => {},
}

export const UserContext = React.createContext(initialContext)
export const useUserContext = () => useContext(UserContext)
export default UserContext
