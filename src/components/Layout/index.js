import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from './PageWrapper'
import style from './style.module.css'

const Layout = ({
  aside,
  preMain,
  noPadding,
  children,
}) => {
  return (
    <PageWrapper>
      <div className={noPadding ? style.noMainPadding : style.mainPadding}>
        <div className={aside ? style.asideLayout : style.standardLayout}>
          {preMain}
          {aside ? <aside>{aside}</aside> : null}
          <main id='mainContent'>{children}</main>
        </div>
      </div>
    </PageWrapper>
  )
}

Layout.propTypes = {
  aside: PropTypes.node,
  preMain: PropTypes.node,
  noPadding: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  aside: null,
  preMain: null,
  noPadding: false,
}
export default Layout
