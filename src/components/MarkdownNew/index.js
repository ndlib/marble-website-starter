import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Layout from 'components/Layout'
import Seo from 'components/Shared/Seo'
import Navigation from 'components/Shared/Navigation'
import ComponentRenderer from './ComponentRenderer'
import style from './style.module.css'

const MarkdownPageRenderer = ({ data, location }) => {
  const layoutComponents = typy(data, 'markdownRemark.frontmatter.components').safeObject
  const { frontmatter, html } = data.markdownRemark
  const seoTitle = frontmatter.title || data.site.siteMetadata.title
  const navigation = (frontmatter.menu ? <Navigation id={frontmatter.menu} /> : null)

  return (
    <Layout
      title={frontmatter.title}
      nav={navigation}
      location={location}
      preMain={
        <React.Fragment>
          <Seo
            title={seoTitle}
            pathname={location.pathname}
          />
        </React.Fragment>
      }
    >
      <div
        className={style.bodyText}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {
        layoutComponents.map((c, i) => {
          const comps = expandChildren(c, i)
          return comps
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

export const expandChildren = (row, key = 0) => {
  const children = row.components

  if (children) {
    const childComponents = []
    children.forEach((child, i) => {
      childComponents.push(expandChildren(child, i))
    })
    return (
      <ComponentRenderer
        component={row.component}
        children={childComponents}
        key={`${row.component}-${key}`}
        {...transformProps(row.props)}
      />
    )
  }

  return (
    <ComponentRenderer
      component={row.component}
      key={`${row.component}-${key}`}
      {...transformProps(row.props)}
    />
  )
}

export const transformProps = (propObjectArr) => {
  if (!propObjectArr) {
    return null
  }
  const props = {}
  propObjectArr.forEach(propObject => {
    props[propObject.label] = propObject.value || propObject.fileValue.publicURL
  })
  return props
}
