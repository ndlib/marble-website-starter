import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Seo from 'components/Internal/Seo'
import { ownsPage } from 'utils/auth'
import Ownership from './Ownership'

const CompilationLayout = ({ compilation, edit, location, loginReducer, children }) => {
  const { user } = compilation
  const isOwner = ownsPage(loginReducer, user.userName)
  if (!isOwner && edit) {
    navigate(`/compilation/${compilation.id}`)
  }
  return (
    <React.Fragment>
      <Seo
        title={compilation.title}
        location={location}
        data={{}}
        noIndex // ={compilation.visibility !== 'public'}
      />
      <Ownership
        compilation={compilation}
        loginReducer={loginReducer}
      />
      {children}
    </React.Fragment>
  )
}

CompilationLayout.propTypes = {
  compilation: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default CompilationLayout
