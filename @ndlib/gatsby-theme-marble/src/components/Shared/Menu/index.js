/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Box } from 'theme-ui'
import Link from 'components/Shared/Link'

/*
  Class to add a themed menu to the site.
  props:
  variant - the style variant for changing propeties in the theme-ui theme see below.
  items   - array of items in the format of [ {id, label link} ... ]
  label   - label to display at the top.

  Theme UI Variant.
  writes a variant called links.${variant}
  Can be edited in the theme.
  Examples of existing variants
    header:
    foooter:
    vertical
*/
export const Menu = ({ variant, items, label }) => {
  return (
    <Box as='nav' sx={{ variant: `links.${variant}` }}>
      {label ? <h3>{label}</h3> : null}
      <div>
        {items.map(l => {
          return (
            <Link
              to={l.link}
              key={l.id}
            >{l.label}
            </Link>)
        })}
      </div>
    </Box>
  )
}

Menu.propTypes = {
  variant: PropTypes.string.isRequired,
  items: PropTypes.array,
  label: PropTypes.string,
}

Menu.defaultProps = {
  items: [],
  label: '',
}

export const findNavInData = (id, navData) => {
  return navData.find((element) => {
    return element.id === id
  })
}

export default Menu
