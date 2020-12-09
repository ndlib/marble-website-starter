/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { findNavInData } from 'components/Shared/Menu'
import { jsx } from 'theme-ui'
import hamburgerIcon from 'assets/icons/svg/baseline-menu-24px-white.svg'
export const menuQuery = graphql`
  query {
    allMenusJson {
      nodes {
        id
        label
        items {
          id
          link
          label
        }
      }
    }
  }
`

const HamburgerButton = ({ onClick, onBlur, sxStyle }) => {
  const { site } = useStaticQuery(menuQuery)
  const menus = typy(site, 'siteMetadata.menus').safeArray
  const topMenu = findNavInData('top', menus)

  // No hamburger if no menu
  if (!topMenu || typy(topMenu, 'items').safeArray.length < 1) {
    return null
  }
  return (
    <button
      className='hamburgerButton'
      onClick={(e) => onClick(e)}
      onBlur={(e) => onBlur(e)}
      sx={sxStyle}
    >
      <img
        src={hamburgerIcon}
        alt='Show Menu'
        title='Show Menu'
      />
    </button>
  )
}

HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  sxStyle: PropTypes.object,
}
export default HamburgerButton
