/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Styled, jsx } from 'theme-ui'
import typy from 'typy'
import Link from 'components/Internal/Link'
import sx from './sx'

export const menuQuery = graphql`
  query {
    site {
      siteMetadata {
        menus {
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
  }
`

export const Menu = ({ menu, navClass }) => {
  const { site } = useStaticQuery(menuQuery)
  const menus = typy(site, 'siteMetadata.menus').safeArray
  const expandedMenu = findNavInData(menu, menus)
  if (!expandedMenu) {
    return null
  }

  const vertical = navClass === 'verticalMenu'
  const flex = menu === 'top'
  return (
    <nav
      sx={sx.base(vertical, flex)}
    >
      { expandedMenu.label ? <Styled.h3>{expandedMenu.label}</Styled.h3> : null }
      { expandedMenu.items.map(l => {
        return <Styled.a
          as={Link}
          to={l.link}
          key={l.id}
          sx={sx.item(vertical, flex)}
        >{l.label}</Styled.a>
      })}
    </nav>
  )
}

Menu.propTypes = {
  menu: PropTypes.string.isRequired,
  navClass: PropTypes.string,
}

export const findNavInData = (id, navData) => {
  return navData.find((element) => {
    return element.id === id
  })
}

export default Menu
