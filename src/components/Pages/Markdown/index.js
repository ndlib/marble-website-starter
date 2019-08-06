import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import SearchBase from 'components/Internal/SearchBase'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import Navigation from 'components/Internal/Navigation'
import MarkdownLayoutRenderer from '../../../../plugins/gatsby-remark-react-components'
import availableComponents from './availableComponents'

const Markdown = ({ data, location }) => {
  const title = typy(data, 'markdownRemark.frontmatter.title').safeString || null
  const navigation = (typy(data, 'markdownRemark.frontmatter.menu').isString ? <Navigation id={data.markdownRemark.frontmatter.menu} /> : null)
  const globalProps = getglobalProps(data, location)
  return (
    <SearchBase data={data}>
      <Layout
        title={title}
        nav={navigation}
        location={location}
      >
        <Seo
          data={data}
          location={location}
        />
        <MarkdownLayoutRenderer
          markdownRemark={data.markdownRemark}
          location={location}
          availableComponents={availableComponents}
          globalProps={globalProps}
        />
      </Layout>
    </SearchBase>
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
    menu: typy(data, 'markdownRemark.frontmatter.menu').safeString,
    title: typy(data, 'markdownRemark.frontmatter.title').safeString,
    iiifManifest: typy(data, 'markdownRemark.frontmatter.iiifJson').safeObject,
    location: location,
  }
}
