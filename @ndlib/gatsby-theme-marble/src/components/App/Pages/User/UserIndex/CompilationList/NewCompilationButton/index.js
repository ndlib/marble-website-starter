import React from 'react'
import MaterialButton from 'components/Internal/MaterialButton'

const NewCompilationButton = () => {
  return (
    <MaterialButton
      onClick={() => console.log('Create new Compilation')}
      wide
    >Create New Compilation</MaterialButton>
  )
}

export default NewCompilationButton
