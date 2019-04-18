import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from './PageWrapper'
import ContentWrapper from './ContentWrapper'
import PageContent from './PageContent'

const Layout = ({
  aside, // content related to but separate from main - use either nav or aside not both
  asideClassName, // special className for aside
  articleClassName, // special className for article inside main
  nav, // sidebar navigation - use either nav or aside not both
  title, // page title to be placed inside main
  preMain, // stuff before main like header image and breadcrumbs - exists outside noPadding wrapper
  noPadding, // bool used to avoid padding page content
  children,
}) => {
  return (
    <PageWrapper>
      <ContentWrapper
        preMain={preMain}
        noPadding={noPadding}
      >
        <PageContent
          aside={aside}
          asideClassName={asideClassName}
          articleClassName={articleClassName}
          nav={nav}
          title={title}
        >
          {children}
        </PageContent>
      </ContentWrapper>
    </PageWrapper>
  )
}

Layout.propTypes = {
  aside: PropTypes.node,
  asideClassName: PropTypes.string,
  articleClassName: PropTypes.string,
  nav: PropTypes.node,
  title: PropTypes.node,
  preMain: PropTypes.node,
  noPadding: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Layout
