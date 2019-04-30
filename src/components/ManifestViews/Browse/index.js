import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Card from 'components/Shared/Card'
import SEO from 'components/Seo'
import Breadcrumb from 'components/Shared/Breadcrumb'

const Browse = ({ data, location }) => {
  console.log(location.state)
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
          <Breadcrumb
            title={category.label}
            location={location}
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
                location={location}
                referal={{
                  type:'browse',
                  label: category.label,
                  target: location.pathname,
                }}
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
  location: PropTypes.object.isRequired,
}

export default Browse

export const buildCrumbs = (category) => {
  const crumbs = []
  if (category.topLevelParentCategory) {
    crumbs.push({ to: category.topLevelParentCategory.slug, label: category.topLevelParentCategory.label })
  }
  if (category.parentCategory &&
    category.topLevelParentCategory &&
    category.topLevelParentCategory.id !== category.parentCategory.id
  ) {
    crumbs.push({ to: category.parentCategory.slug, label: category.parentCategory.label })
  }
  return crumbs
}
