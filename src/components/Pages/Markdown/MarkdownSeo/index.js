import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Seo from 'components/Internal/Seo'

const MarkdownSeo = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark
  const seoTitle = frontmatter.title || typy(frontmatter, 'iiifJson.label').safeString || data.site.siteMetadata.title
  const seoImage = typy(frontmatter, 'iiifJson.thumbnail._id').safeString
  const seoDescription = frontmatter.description || typy(frontmatter, 'iiifJson.description').safeString || null

  return (
    <Seo
      title={seoTitle}
      image={seoImage}
      description={seoDescription}
      pathname={location.pathname}
    />
  )
}

MarkdownSeo.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MarkdownSeo
