import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import { StaticQuery, graphql } from 'gatsby'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Navigation from '../../../Shared/Navigation'

export const Footer = ({ data }) => {
  const footerText = data.site.siteMetadata.footerText
  const layouts = {
    lg: [
      { i: 'footerText', x: 0, y: 0, w: 6, h: 1, static: true },
      { i: 'footerNavigation', x: 8, y: 0, w: 4, h: 1, static: true },
    ],
    md: [
      { i: 'footerText', x: 0, y: 1, w:10, h: 1, static: true },
      { i: 'footerNavigation', x: 0, y: 0, w: 10, h: 1, static: true },
    ],
  }

  return (
    <footer className={style.pageFooter}>
      <div className={style.footerInner}>
        <ResponsiveGridList
          layouts={layouts}
          measureBeforeMount
          rowHeight={400}
        >
          <div
            key='footerText'
            className={style.footerText}
          >
            <span
              dangerouslySetInnerHTML={{ __html: footerText }}
            />
          </div>
          <div
            key='footerNavigation'
            className={style.footerLinks}
          >
            <Navigation id='footer' />
          </div>
        </ResponsiveGridList>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  data: PropTypes.object.isRequired,
}

export default () => {
  return (
    <StaticQuery
      query={graphql`
      query {
        site {
          siteMetadata {
            footerText
          }
        }
      }
    `
      }
      render={data => (
        <Footer data={data} />
      )}
    />
  )
}
