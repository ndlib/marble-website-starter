/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, BaseStyles } from 'theme-ui'
import UserAnnotation from 'components/Shared/UserAnnotation'
import ReturnToSearch from 'components/Shared/ReturnToSearch'
import ParentLink from 'components/Shared/ParentLink'
import theme from 'gatsby-plugin-theme-ui'

const PageContent = ({
  title,
  children,
  location,
}) => {
  return (
    <main id='mainContent' sx={theme.styles.Main}>
      <ReturnToSearch location={location} />
      <ParentLink>{children}</ParentLink>
      {title ? <BaseStyles><h1>{title}</h1></BaseStyles> : null}
      <UserAnnotation location={location} />
      <article>{children}</article>
    </main>
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
