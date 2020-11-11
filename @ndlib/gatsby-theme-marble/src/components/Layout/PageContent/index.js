import React from 'react'
import PropTypes from 'prop-types'
import { Main, BaseStyles } from 'theme-ui'
import UserAnnotation from 'components/Internal/UserAnnotation'
import ReturnToSearch from 'components/Internal/ReturnToSearch'
import ParentLink from 'components/Internal/ParentLink'

const PageContent = ({
  title,
  children,
  location,
}) => {
  return (
    <Main id='mainContent'>
      <ReturnToSearch location={location} />
      <ParentLink>{children}</ParentLink>
      {title ? <BaseStyles><h1>{title}</h1></BaseStyles> : null}
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
