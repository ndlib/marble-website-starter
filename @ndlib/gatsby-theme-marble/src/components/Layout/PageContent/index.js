import React from 'react'
import PropTypes from 'prop-types'
import { Main, Styled } from 'theme-ui'
import UserAnnotation from 'components/Internal/UserAnnotation'
import ReturnToSearch from 'components/Internal/ReturnToSearch'
import { useTranslation } from 'react-i18next'
const PageContent = ({
  title,
  children,
  location,
}) => {
  const { t } = useTranslation()
  return (
    <Main id='mainContent'>
      <ReturnToSearch location={location} />
      {title ? <Styled.h1>{title}</Styled.h1> : null}
      <UserAnnotation location={location} />
      <article>{children}</article>
      <div>Common: { t('common:button.login') }</div>
      <div>Text: { t('text:home.footerText') }</div>
      <div>Text: { t('text:home.something') }</div>
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
