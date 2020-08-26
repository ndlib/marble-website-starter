import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const TestPage = ({ location }) => {
  // (relativePath: { eq: "iiif/1934.007.001%2F1934_007_001-v0001.jpg" })
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {extension: {eq: "jpg"}}) {
        nodes {
          publicURL
          childImageSharp {
            fixed(height: 50, width: 50, quality: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  `)
  console.log(data)
  return (
    <div>
      {
        data.allFile.nodes.map(image => {
          return (
            <Img
              fixed={image.childImageSharp.fixed}
              alt='derivative child'
              key={image.publicURL}
            />

          )
        })
      }
    </div>
  )
}

TestPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default TestPage
