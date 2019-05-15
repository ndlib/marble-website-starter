import React from 'react'
import PropTypes from 'prop-types'
import SkipToMain from './SkipToMain'
import BrandingHeader from './BrandingHeader'
import NavigationHeader from './NavigationHeader'
import Footer from './Footer'

const PageWrapper = ({ children, location }) => {
  return (
    <React.Fragment>
      <SkipToMain />
      <BrandingHeader />
      <NavigationHeader location={location} />
      {children}
      <Footer />
    </React.Fragment>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default PageWrapper
