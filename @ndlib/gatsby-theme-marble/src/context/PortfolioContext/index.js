import React, { useContext } from 'react'
export const initialContext = {
  portfolio: {},
  updatePortfolio: () => {},
  portfolioLoading: () => {},
  updatePortfolioItem: () => {},
  removePortfolioItem: () => {},
  reorderPortfolio: () => {},
}

export const PortfolioContext = React.createContext(initialContext)
export const usePortfolioContext = () => useContext(PortfolioContext)
export default PortfolioContext
