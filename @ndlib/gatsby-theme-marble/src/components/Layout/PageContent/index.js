import React from 'react'
import PropTypes from 'prop-types'
import { Main, Styled } from 'theme-ui'
import UserAnnotation from 'components/Internal/UserAnnotation'

const PageContent = ({
  title,
  children,
  location,
}) => {
  return (
    <Main id='mainContent'>
      {title ? <Styled.h1>{title}</Styled.h1> : null}
      <UserAnnotation location={location} />
      <article>{children}</article>
    </Main>
  )
}

PageContent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

PageContent.defaultProps = {
  title: null,
}
export default PageContent
