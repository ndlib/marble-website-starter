import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MiradorViewerPage from 'components/MiradorViewerPage'

export const MiradorPage = ({ data, location }) => {
  return (
    <MiradorViewerPage data={data} location={location} />
  )
}
MiradorPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default MiradorPage

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        iiifJson {
          id
        }
      }
    }
  }
`
