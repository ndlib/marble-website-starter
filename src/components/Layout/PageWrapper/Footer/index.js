import React from 'react'
import style from './style.module.css'
import { Link, StaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'


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
        <div className={style.footerLinks}>
          <nav>
            { links.map(l => {
              return <Link to={l.link} key={l.title}>{l.title}</Link>
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
export default () => {
  return (
    <StaticQuery
      query={graphql`
      query {
        site {
          siteMetadata {
            footerTextMarkdown
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
