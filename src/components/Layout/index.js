import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from './PageWrapper'
import style from './style.module.css'

// eslint-disable-next-line complexity
const Layout = ({
  aside, // content related to but separate from main
  asideClassName, // special className for aside
  articleClassName, // special className for article inside main
  nav, // sidebar navigation
  title, // page title to be placed inside main
  preMain, // stuff before main like header image - exists outside noPadding wrapper
  noPadding, // bool used to avoid padding page content
  children,
}) => {
  return (
    <PageWrapper>
      <div className={style.preMain}>{preMain}</div>
      <div className={noPadding ? style.noMainPadding : style.mainPadding}>
        {nav ? <nav>{nav}</nav> : null}
        <main
          id='mainContent'
          className={aside ? style.asideLayout : style.standardLayout}
        >
          {title ? <h1>{title}</h1> : null}
          {aside ? <aside className={asideClassName}>{aside}</aside> : null}
          <article className={articleClassName}>{children}</article>
        </main>
      </div>
    </PageWrapper>
  )
}

Layout.propTypes = {
  aside: PropTypes.node,
  asideClassName: PropTypes.string.isRequired,
  articleClassName: PropTypes.string.isRequired,
  nav: PropTypes.node,
  title: PropTypes.node,
  preMain: PropTypes.node,
  noPadding: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  aside: null,
  asideClassName: style.defaultAsideClass,
  articleClassName: style.mainArticle,
  nav: null,
  title: null,
  preMain: null,
  noPadding: false,
}
export default Layout
