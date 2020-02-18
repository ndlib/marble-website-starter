import React from 'react'
import MaterialButton from 'components/Internal/MaterialButton'

const NewPortfolioButton = () => {
  return (
    <MaterialButton
      onClick={() => console.log('Create new Portfolio')}
      wide
    >Create New Portfolio</MaterialButton>
  )
}

export default NewPortfolioButton
