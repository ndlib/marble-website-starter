import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Layout from 'components/Layout'
import Seo from 'components/Shared/Seo'
import MarkdownSeo from './MarkdownSeo'
import Navigation from 'components/Shared/Navigation'
import ComponentRenderer from './ComponentRenderer'

const MarkdownPageRenderer = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark
  const layoutComponents = typy(frontmatter, 'components').safeObject

  const navigation = (frontmatter.menu ? <Navigation id={frontmatter.menu} /> : null)

  return (
    <Layout
      title={frontmatter.title}
      nav={navigation}
      location={location}
      preMain={
        <React.Fragment>
          <MarkdownSeo
            data={data}
            location={location}
          />
        </React.Fragment>
      }
    >
      {
        layoutComponents.map((comp, index) => {
          return expandChildren(comp, data, location, index)
        })
      }
    </Layout>
  )
}

MarkdownPageRenderer.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default MarkdownPageRenderer

export const expandChildren = (row, data, location, key = 0) => {
  const children = row.components

  if (children) {
    const childComponents = []
    children.forEach((child, i) => {
      childComponents.push(expandChildren(child, data, location, i))
    })
    return (
      <ComponentRenderer
        component={row.component}
        children={childComponents}
        key={`${row.component}-${key}`}
        {...transformProps(data, location, row.props)}
      />
    )
  }

  return (
    <ComponentRenderer
      component={row.component}
      key={`${row.component}-${key}`}
      {...transformProps(data, location, row.props)}
    />
  )
}

export const getParentProps = (data, location) => {
  return {
    html: typy(data, 'markdownRemark.html').safeString,
    menu: typy(data, 'markdownRemark.frontmatter.menu').safeString,
    title: typy(data, 'markdownRemark.frontmatter.title').safeString,
    iiifManifest: typy(data, 'markdownRemark.frontmatter.iiifJson').safeObject,
    location: location,
  }
}

export const transformProps = (data, location, propObjectArr) => {
  const props = getParentProps(data, location)
  typy(propObjectArr).safeArray.forEach(propObject => {
    props[propObject.label] = propObject.value || propObject.fileValue.publicURL
  })
  return props
}
