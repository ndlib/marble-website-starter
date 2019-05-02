import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import style from './style.module.css'
import Link from 'components/Shared/Link'

export const Navigation = ({ menu, navClass }) => {
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
  menu: PropTypes.string.isRequired,
  navClass: PropTypes.string,
}

export const findNavInData = (id, navData) => {
  return navData.find((element) => {
    return element.id === id
  })
}

export default ({ id, navClass }) => {
  return (
    <StaticQuery
      query={graphql`
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
    `}
      render={data => {
        const menus = data.site.siteMetadata.menus
        const menu = findNavInData(id, menus)
        if (menu) {
          return (<Navigation menu={menu} navClass={navClass} />)
        } else {
          return (null)
        }
      }}
    />
  )
}
