import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { ownsPage } from 'utils/auth'
import ItemList from './ItemList'
import CompilationUnavailable from './CompilationUnavailable'
import { getCompilation } from 'utils/appUtils'

// eslint-disable-next-line complexity
const Compilation = ({ location, compilationId, loginReducer }) => {
  const compilation = getCompilation(compilationId)
  const username = typy(compilation, 'user.username').safeString
  const showCompilation = shouldShow(compilation, ownsPage(loginReducer, username))
  if (showCompilation) {
    return (
      <ItemList
        compilation={compilation}
        location={location}
        loginReducer={loginReducer}
      />
    )
  }
  return (
    <CompilationUnavailable
      location={location}
      loginReducer={loginReducer}
    />
  )
}

Compilation.propTypes = {
  compilationId: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export default Compilation

export const shouldShow = (compilation, isOwner) => {
  const visibility = typy(compilation, 'visibility').safeString
  return visibility === 'public' || visibility === 'shared' || isOwner
}
