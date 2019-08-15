import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import SearchBase from 'components/Internal/SearchBase'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import Navigation from 'components/Internal/Navigation'
import MarkdownLayoutRenderer from 'components/Internal/MarkdownLayoutRenderer'
import availableComponents from './availableComponents'

const Markdown = ({ data, location }) => {
  const title = typy(data, 'remarkMarblePage.frontmatter.title').safeString || null
  const navigation = (typy(data, 'remarkMarblePage.frontmatter.menu').isString ? <Navigation id={data.remarkMarblePage.frontmatter.menu} /> : null)
  const globalProps = getglobalProps(data, location)
  return (
    <SearchBase data={data}>
      <Layout
        title={title}
        nav={navigation}
        location={location}
      >
      {
        <Seo
          data={data}
          location={location}
          noIndex // TODO remove this line when ready to index!!!!
        />
      }
        <MarkdownLayoutRenderer
          markdownRemark={data.remarkMarblePage}
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
    menu: typy(data, 'remarkMarblePage.frontmatter.menu').safeString,
    title: typy(data, 'remarkMarblePage.frontmatter.title').safeString,
    iiifManifest: typy(data, 'remarkMarblePage.frontmatter.iiifJson').safeObject,
    location: location,
  }
}
