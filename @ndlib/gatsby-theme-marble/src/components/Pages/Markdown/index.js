import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import MarkdownLayoutRenderer from 'components/Internal/MarkdownLayoutRenderer'
import availableComponents from './availableComponents'

const Markdown = ({ data, location }) => {
  const title = typy(data, 'remarkMarblePage.frontmatter.title').safeString || null
  const globalProps = getglobalProps(data, location)
  return (
    <Layout
      title={title}
      location={location}
    >
      <Seo
        data={data}
        location={location}
      />
      <MarkdownLayoutRenderer
        markdownRemark={data.remarkMarblePage}
        location={location}
        availableComponents={availableComponents}
        globalProps={globalProps}
      />
    </Layout>
  )
}

Markdown.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default Markdown

export const getglobalProps = (data, location) => {
  return {
    html: typy(data, 'markdownRemark.html').safeString,
    menu: typy(data, 'remarkMarblePage.frontmatter.menu').safeString,
    defaultSearch: typy(data, 'remarkMarblePage.frontmatter.defaultSearch').safeArray,
    title: typy(data, 'remarkMarblePage.frontmatter.title').safeString,
    iiifManifest: typy(data, 'remarkMarblePage.frontmatter.iiifJson').safeObject,
    location: location,
  }
}
