import React from 'react'
import PropTypes from 'prop-types'
import SkipToMain from './SkipToMain'
import BrandingHeader from './BrandingHeader'
import NavigationHeader from './NavigationHeader'
import Footer from './Footer'

const PageWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <SkipToMain />
      <BrandingHeader />
      <NavigationHeader />
      {children}
      <Footer />
    </React.Fragment>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageWrapper
