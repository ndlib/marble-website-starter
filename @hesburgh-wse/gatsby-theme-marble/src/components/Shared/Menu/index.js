import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Styled } from 'theme-ui'
import typy from 'typy'
import Link from 'components/Internal/Link'
import './style.css'
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
  return (
    <nav className={navClass}>
      { expandedMenu.label ? <Styled.h3>{expandedMenu.label}</Styled.h3> : null }
      { expandedMenu.items.map(l => {
        return <Link to={l.link} key={l.id}>{l.label}</Link>
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
