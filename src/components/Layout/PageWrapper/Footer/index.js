import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import { StaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import Navigation from '../../../Shared/Navigation'

export const Footer = ({ data }) => {
  const links = data.site.siteMetadata.menus.footer
  const footerText = data.site.siteMetadata.footerTextMarkdown
  return (
    <footer className={style.pageFooter}>
      <div className={style.footerInner}>
        <div className={style.footerText}>
          <ReactMarkdown source={footerText} />
        </div>
        <div className={style.footerCenter} />
        <div>
          <Navigation links={links} navClass={style.footerLinks} />
        </div>
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
            menus {
              footer {
                id
                link
                title
              }
            }
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
