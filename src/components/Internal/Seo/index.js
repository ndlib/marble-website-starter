import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import SeoContent from './SeoContent'

const Seo = (props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  return (
    <SeoContent site={site} {...props} />
  )
}

Seo.defaultProps = {
  lang: `en`,
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  pathname: PropTypes.string,
}

export default Seo
