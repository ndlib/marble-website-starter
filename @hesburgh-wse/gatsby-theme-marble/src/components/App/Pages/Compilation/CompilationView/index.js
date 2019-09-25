import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'
import CalloutBox from 'components/Internal/CalloutBox'
import { ownsPage } from 'utils/auth'
import CompilationDisplay from './CompilationDisplay'

const CompilationView = ({ compilation, loginReducer }) => {
  const { description, items, display, user } = compilation
  const isOwner = ownsPage(loginReducer, user.username)
  return (
    <React.Fragment>
      {
        isOwner
          ? <p style={{ textAlign: 'right' }}>
            <MaterialButton onClick={() => navigate(`/compilation/${compilation.id}/edit`)}>Edit</MaterialButton>
          </p> : null
      }
      {
        description ? <div><CalloutBox><p>{description}</p></CalloutBox></div> : null
      }
      <CompilationDisplay
        display={display}
        items={items}
        user={user}
      />
    </React.Fragment>
  )
}

CompilationView.propTypes = {
  compilation: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default CompilationView
