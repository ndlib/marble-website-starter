import React from 'react'
import style from './style.module.css'
import { useStaticQuery, graphql } from 'gatsby'
import ResponsiveGridList from 'components/Internal/ResponsiveGridList'
import Menu from 'components/Shared/Menu'

export const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
    query {
      site {
        siteMetadata {
          footerText
        }
      }
    }
  `
  )
  const footerText = site.siteMetadata.footerText
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
            <Menu menu='footer' />
          </div>
        </ResponsiveGridList>
      </div>
    </footer>
  )
}

export default Footer
