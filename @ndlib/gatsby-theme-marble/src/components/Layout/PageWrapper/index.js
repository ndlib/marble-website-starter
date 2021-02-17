import React from 'react'
import PropTypes from 'prop-types'
import SkipToMain from './SkipToMain'
import Footer from './Footer'

const PageWrapper = ({ children, location }) => {
  return (
    <>
      <SkipToMain />
      {children}
      <Footer />
    </>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default PageWrapper
