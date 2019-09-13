import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'
const EditUserButton = ({ username }) => {
  return (
    <React.Fragment>
      <MaterialButton
        label='Edit Profile'
        onClick={() => navigate(`/user/${username}/edit`)}
        wide
      />
    </React.Fragment>
  )
}

EditUserButton.propTypes = {
  username: PropTypes.string.isRequired,
}
export default EditUserButton
