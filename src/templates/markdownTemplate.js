import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/Shared/Seo'
import Navigation from 'components/Shared/Navigation'
import { ReactiveBase, DataSearch, MultiList, SingleDataList, ReactiveList, DynamicRangeSlider, MultiDropdownList, MultiDataList, SelectedFilters } from '@appbaseio/reactivesearch'
import Card from 'components/Shared/Card'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'


export const MarkdownTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const navigation = (post.frontmatter.menu ? <Navigation id={post.frontmatter.menu} /> : null)
  const category = (post.frontmatter.category ? <Navigation id={post.frontmatter.menu} /> : null)
  return (
    <Layout
      title={post.frontmatter.title}
      nav={navigation}
      preMain={<SEO title={post.frontmatter.title} />}
      location={location}
    >
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <ReactiveBase
        app="website"
        url="https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com">

        <ReactiveList
            componentId="SearchResult"
            dataField={"title"}
            excludeFields={ ["fulltext"] }
            showResultStats={false}
            defaultQuery={ () => {
              return {
                "query" : {
                  "match" : {
                    "categories.keyword" : "europe"
                  }
                }
              }
            }}
            size={21}            
            react={{
                "and": ["SearchResult", "location"]
            }}
        >
        {({ data, error, loading, ...rest }) => (
          <ResponsiveGridList measureBeforeMount={true}>
            {
              data.map(res => (
                <div key={res['_id']}>
                  <Card
                    label={res.title}
                    image={res.thumbnail}
                    target={res.url}
                    location={location}
                    referal={{ type: 'search', query: location.search }}
                  >
                    <div className='description'>{res.description}</div>
                    <div>{res.creator}</div>
                  </Card>
                </div>
                )
              )
            }
          </ResponsiveGridList>
        )}


        </ReactiveList>

      </ReactiveBase>
    </Layout>
  )
}

MarkdownTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default MarkdownTemplate

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        menu
      }
    }
  }
`
