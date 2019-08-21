import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

// eslint-disable-next-line complexity
const PageContent = ({
  title,
  children,
}) => {
  return (
    <React.Fragment>
      <main
        id='mainContent'
        className={style.standardLayout}
      >
        {title ? <h1>{title}</h1> : null}
        <article>{children}</article>
      </main>
    </React.Fragment>
  )
}

PageContent.propTypes = {
  title: PropTypes.node,

  children: PropTypes.node.isRequired,
}

PageContent.defaultProps = {
  articleClassName: style.mainArticle,
  title: null,

}
export default PageContent
