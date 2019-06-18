import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import BrowsePager from './BrowsePager'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Card from 'components/Shared/Card'
import SEO from 'components/Shared/Seo'

const Browse = ({ data, location }) => {
  const category = data.browseCategory
  const group = mergeGroups(category.subCategories, category.manifests)

  return (
    <Layout
      title={category.label}
      preMain={
        <React.Fragment>
          <SEO
            title={category.label}
            description={category.description}
            image={category.thumbnail ? category.thumbnail._id : null}
            pathname={location.pathname}
          />
        </React.Fragment>
      }
      location={location}
    >
      <BrowsePager parentCategory={data.browseCategory.parentCategory} />
      <p>{category.description}</p>
      <ResponsiveGridList measureBeforeMount>
        {
          group.map(node => {
            const { label, slug, thumbnail } = node
            return (
              <div key={slug}>
                <Card
                  key={slug}
                  target={slug}
                  label={label}
                  image={thumbnail ? thumbnail._id : null}
                  iiifManifest={node}
                />
              </div>
            )
          })
        }
      </ResponsiveGridList>
    </Layout>
  )
}

Browse.propTypes = {
  data: PropTypes.shape({
    browseCategory: PropTypes.shape({
      label: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  }),
  location: PropTypes.object.isRequired,
}

export default Browse

export const mergeGroups = (group1, group2) => {
  group1 = group1 || []
  group2 = group2 || []
  return group1.concat(group2)
}
