import React from 'react'
import PropTypes from 'prop-types'
import { Layout as ThemeLayout } from 'theme-ui'
import PrivateRoute from './PrivateRoute'
import PageWrapper from './PageWrapper'
import ContentWrapper from './ContentWrapper'
import PageContent from './PageContent'

/// CONSTRUCTION BANNER
// import ConstructionBanner from './ConstructionBanner'

const Layout = ({
  title, // page title to be placed inside main
  noPadding, // bool used to avoid padding page content
  children,
  requireLogin, // bool to test login
  location,
}) => {
  return (
    <ThemeLayout>
      <PrivateRoute
        location={location}
        requireLogin={requireLogin}
      >
        <PageWrapper location={location}>
          {
            // <ConstructionBanner />
          }
          <ContentWrapper
            noPadding={noPadding}
          >
            <PageContent
              title={title}
            >
              {children}
            </PageContent>
          </ContentWrapper>
        </PageWrapper>
      </PrivateRoute>
    </ThemeLayout>
  )
}

Layout.propTypes = {
  title: PropTypes.node,
  noPadding: PropTypes.bool,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  requireLogin: PropTypes.bool,
}

Layout.defaultProps = {
  requireLogin: false,
}

export default Layout
