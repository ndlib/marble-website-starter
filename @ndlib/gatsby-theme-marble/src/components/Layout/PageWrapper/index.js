import React from 'react'
import PropTypes from 'prop-types'
import SkipToMain from './SkipToMain'
import BrandingHeader from './BrandingHeader'
import NavigationHeader from './NavigationHeader'
import FeedbackModal from 'components/Internal/FeedbackModal'
import Footer from './Footer'

const PageWrapper = ({ children, location }) => {
  return (
    <>
      <SkipToMain />
      <BrandingHeader />
      <NavigationHeader location={location} />
      {children}
      <FeedbackModal />
      <Footer />
    </>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default PageWrapper
