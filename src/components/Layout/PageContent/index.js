import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

// eslint-disable-next-line complexity
const PageContent = ({
  aside,
  asideClassName,
  articleClassName,
  nav,
  title,
  children,
}) => {
  return (
    <React.Fragment>
      {nav ? <nav className={asideClassName}>{nav}</nav> : null}
      <main
        id='mainContent'
        className={aside || nav ? style.asideLayout : style.standardLayout}
      >
        {title ? <h1>{title}</h1> : null}
        {aside ? <aside className={asideClassName}>{aside}</aside> : null}
        <article className={articleClassName}>{children}</article>
      </main>
    </React.Fragment>
  )
}

PageContent.propTypes = {
  aside: PropTypes.node,
  asideClassName: PropTypes.string.isRequired,
  articleClassName: PropTypes.string.isRequired,
  nav: PropTypes.node,
  title: PropTypes.node,

  children: PropTypes.node.isRequired,
}

PageContent.defaultProps = {
  aside: null,
  asideClassName: style.defaultAsideClass,
  articleClassName: style.mainArticle,
  nav: null,
  title: null,

}
export default PageContent
