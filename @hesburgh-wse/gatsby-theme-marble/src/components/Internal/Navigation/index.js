import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import Link from 'components/Internal/Link'

export const Navigation = ({ id, navClass }) => {
  const { site } = useStaticQuery(
    graphql`
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
  )
  const menus = typy(site, 'siteMetadata.menus').safeArray
  const menu = findNavInData(id, menus)
  if (!menu) {
    return null
  }
  return (
    <nav className={navClass}>
      {menu.label ? <h3>{menu.label}</h3> : null}
      { menu.items.map(l => {
        return <Link to={l.link} key={l.id}>{l.label}</Link>
      })}
    </nav>
  )
}

Navigation.propTypes = {
  id: PropTypes.string.isRequired,
  navClass: PropTypes.string,
}

export const findNavInData = (id, navData) => {
  return navData.find((element) => {
    return element.id === id
  })
}

export default Navigation
