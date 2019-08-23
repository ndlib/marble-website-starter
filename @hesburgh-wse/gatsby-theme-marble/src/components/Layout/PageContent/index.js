import React from 'react'
import PropTypes from 'prop-types'
import { Main, Styled } from 'theme-ui'

const PageContent = ({
  title,
  children,
}) => {
  return (
    <Main id='mainContent'>
      {title ? <Styled.h1>{title}</Styled.h1> : null}
      <article>{children}</article>
    </Main>
  )
}

PageContent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

PageContent.defaultProps = {
  title: null,
}
export default PageContent
