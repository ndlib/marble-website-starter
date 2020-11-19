import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import { BaseStyles } from 'theme-ui'
import Link from 'components/Internal/Link'
import miradorIcon from 'assets/icons/svg/mirador-24px.svg'

export const AllPage = ({
  data,
  location,
}) => {
  const items = () => data.allMarbleItem.edges
    .sort((a, b) => {
      const cleanA = cleanString(a.node.title)
      const cleanB = cleanString(b.node.title)
      if (cleanA < cleanB) {
        return -1
      }
      if (cleanA > cleanB) {
        return 1
      }
      return 0
    })
    .map(edge => {
      return (
        <li key={edge.node.slug}>
          <BaseStyles>
            <Link
              to={`${edge.node.slug}`}
            >
              {edge.node.title}
            </Link>
            {
              edge.node.display.toLowerCase() === 'manifest' ? (
                <Link to={`${edge.node.slug}/mirador`}>
                  <img
                    src={miradorIcon}
                    alt='Open in Mirador'
                    style={{
                      height: '16px',
                      width: '16px',
                      verticalAlign: 'text-bottom',
                      display: 'inline',
                    }}
                  />
                </Link>
              ) : null

            }
          </BaseStyles>
          <span>&nbsp;</span>
        </li>
      )
    })

  return (
    <Layout
      title='Sitemap'
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      {
      // <h2>Items</h2>
      }
      <ul>{items()}</ul>
      {
        // Todo add other kinds of pages???
      }
    </Layout>
  )
}

AllPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default AllPage
export const query = graphql`
  query {
    allMarbleItem {
      edges {
        node {
          slug
          title
          display
        }
      }
    }
  }
`

const cleanString = (myString) => {
  const regex = /[[\]"'`()_\-.…,¡!:;*&$@~]/g
  return myString
    .toLowerCase()
    .replace(regex, ' ')
    .trim()
}
