import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { ownsPage } from 'utils/auth'
import CompilationLayout from './CompilationLayout'
import CompilationView from './CompilationView'
import CompilationEdit from './CompilationEdit'
import CompilationUnavailable from './CompilationUnavailable'
import { getCompilation } from 'utils/appUtils'

export const Compilation = ({ compilationId, edit, location, loginReducer }) => {
  const compilation = getCompilation(compilationId)
  const userName = typy(compilation, 'user.userName').safeString
  const showCompilation = shouldShow(compilation, ownsPage(loginReducer, userName))
  if (showCompilation) {
    return (
      <CompilationLayout
        compilation={compilation}
        edit={edit}
        location={location}
        loginReducer={loginReducer}
      >
        {
          edit
            ? <CompilationEdit
              compilation={compilation}
              location={location}
              loginReducer={loginReducer}
            />
            : <CompilationView
              compilation={compilation}
              location={location}
              loginReducer={loginReducer}
            />
        }
      </CompilationLayout>
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
  edit: PropTypes.bool,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export default Compilation

export const shouldShow = (compilation, isOwner) => {
  const visibility = typy(compilation, 'visibility').safeString
  return visibility === 'public' || visibility === 'shared' || isOwner
}
