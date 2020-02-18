import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'
const EditUserButton = ({ userName }) => {
  return (
    <MaterialButton
      onClick={() => navigate(`/user/${userName}/edit`)}
      wide
    >Edit Profile</MaterialButton>
  )
}

EditUserButton.propTypes = {
  userName: PropTypes.string.isRequired,
}
export default EditUserButton
