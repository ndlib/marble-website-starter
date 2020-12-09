/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { BaseStyles, jsx } from 'theme-ui'
import typy from 'typy'
import Link from 'components/Internal/Link'
import sx from './sx'

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

export const Menu = ({ menu, navClass }) => {
  const { allMenusJson } = useStaticQuery(menuQuery)
  const expandedMenu = findNavInData(menu, typy(allMenusJson, 'nodes').safeArray)
  if (!expandedMenu) {
    return null
  }

  const vertical = navClass === 'verticalMenu'
  const flex = menu === 'top'
  return (
    <nav
      sx={sx.base(vertical, flex)}
    >
      <BaseStyles>
        {expandedMenu.label ? <h3>{expandedMenu.label}</h3> : null}
        {expandedMenu.items.map(l => {
          return (
            <Link
              to={l.link}
              key={l.id}
              sx={sx.item(vertical, flex)}
            >{l.label}
            </Link>)
        })}
      </BaseStyles>
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
