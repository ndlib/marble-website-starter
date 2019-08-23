import React from 'react'
import PropTypes from 'prop-types'
import { Main, Styled } from 'theme-ui'
import style from './style.module.css'

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
  articleClassName: style.mainArticle,
  title: null,

}
export default PageContent
