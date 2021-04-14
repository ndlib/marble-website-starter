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
  items   - array of items in the format of [ {id, label link, icon, selectedPatterns} ... ]
  label   - label to display at the top.
  Items:
    items can have several parameters.
      -label and link for the a tag.
      -icon if you want to use an icon instead of the label.  currently only does home.
      -selectedPatterns to add a selected style if the one of the patterns matches the current path
  Theme UI Variant.
  writes a variant called links.${variant}
  Can be edited in the theme.
  Examples of existing variants
    header:
    foooter:
    vertical
*/
export const Menu = ({ variant, items, label, children, location }) => {
  return (
    <Box as='nav' sx={{ variant: `links.${variant}` }}>
      {label ? <h3>{label}</h3> : null}
      <div>
        {items.map(l => {
          return (
            <Link
              to={l.link}
              key={l.id}
              title={l.label}
              activeClassName='selected'
              partiallyActive={selectedUrl(l, location)}
            >{labelOrIcon(l)}
            </Link>)
        })}
        {children}
      </div>
    </Box>
  )
}

const selectedUrl = (l, location) => {
  let ret = false
  if (location && l.selectedPatterns) {
    l.selectedPatterns.forEach((item) => {
      if (location.pathname.match(item)) {
        ret = true
      }
    })
  }
  return ret
}

const labelOrIcon = (l) => {
  if (l.icon && l.icon === 'home') {
    return (
      <svg className='icon' data-icon='home' width='16' height='16'>
        <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref='#icon-home' />
        <svg id='icon-home' viewBox='0 0 576 512'>
          <path d='M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z' />
        </svg>
      </svg>)
  }

  return l.label
}

Menu.propTypes = {
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  items: PropTypes.array,
  label: PropTypes.string,
  children: PropTypes.object,
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
