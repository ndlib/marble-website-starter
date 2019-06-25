import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Shared/Seo'
import HomeBanner from './HomeBanner'
import HomeCardGroups from './HomeCardGroups'
import style from './style.module.css'

const Home = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark
  const { title } = data.site.siteMetadata
  return (
    <Layout
      location={location}
      preMain={
        <React.Fragment>
          <Seo title={title} pathname='/' />
          <HomeBanner frontmatter={frontmatter} location={location} />
        </React.Fragment>
      }
    >
      <div
        className={style.homeText}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <HomeCardGroups groups={frontmatter.cards.groups} />
    </Layout>
  )
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default Home
