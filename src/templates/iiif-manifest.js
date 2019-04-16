import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Thumbnail from "../components/Shared/Thumbnail"

export default ({data}) => (
  <Layout>
    <SEO title={data.iiifManifest.label} description={data.iiifManifest.description} />
    <h1>{data.iiifManifest.label}</h1>
    <p>{data.iiifManifest.description}</p>
    <p><Thumbnail src={data.iiifManifest.thumbnail} /></p>

  </Layout>
)

 export const query = graphql`
  query($slug: String!) {
    iiifManifest( slug: { eq: $slug }) {
      id
      label
      description
      slug
      thumbnail {
        _id
      }
    }
  }
`
