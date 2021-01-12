import React from 'react'
import PropTypes from 'prop-types'
import HelpPage from 'components/Pages/HelpPage'

const Help = ({ location }) => {
  return (
    <HelpPage location={location} />
  )
}

Help.propTypes = {
  location: PropTypes.object.isRequired,
}
export default Help
