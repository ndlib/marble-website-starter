import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import HorizontalSubmenu from 'components/Internal/HorizontalSubmenu'

const UserTopMenu = ({ username, location }) => {
  const options = makeOptions([
    { label: 'Compilations', path: `/user/${username}` },
    { label: 'Following', path: `/user/${username}/following` },
  ], location.pathname)

  return (
    <HorizontalSubmenu options={options} />
  )
}

UserTopMenu.propTypes = {
  username: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}

export default UserTopMenu

export const makeOptions = (options, pathname) => {
  return options.map(option => {
    return {
      label: option.label,
      func: () => navigate(option.path),
      isActive: option.path === pathname,
    }
  })
}
