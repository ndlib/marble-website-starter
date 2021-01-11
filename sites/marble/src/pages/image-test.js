/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

const TestPage = ({ location }) => {
  // (relativePath: { eq: "iiif/1934.007.001%2F1934_007_001-v0001.jpg" })
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {extension: {eq: "jpg"}}) {
        nodes {
          publicURL
          childImageSharp {
            fixed(height: 50, width: 50, quality: 50) {
              src
            }
          }
        }
      }
    }
  `)
  return (
    <div>
      {
        data.allFile.nodes.map(image => {
          return (
            <img
              sx={{
                display: 'inline',
                verticalAlign: 'top',
              }}
              src={image.childImageSharp.fixed.src}
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
