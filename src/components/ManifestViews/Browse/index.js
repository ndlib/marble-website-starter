import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Card from 'components/Shared/Card'
import SEO from 'components/Shared/Seo'

const Browse = ({ data }) => {
  const category = data.browseCategory
  const groups = [category.subCategories, category.manifests]
  return (
    <Layout
      title={category.label}
      preMain={
        <React.Fragment>
          <SEO
            title={category.label}
            description={category.description}
            image={category.thumbnail ? category.thumbnail._id : null}
          />
        </React.Fragment>
      }
    >
      <p>{category.description}</p>
      {
        groups.map(group => {
          return group && group.map(node => {
            const { label, slug, thumbnail } = node
            return (
              <Card
                key={slug}
                target={slug}
                label={label}
                image={thumbnail ? thumbnail._id : null}
              />

            )
          })
        })
      }

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
}

export default Browse
