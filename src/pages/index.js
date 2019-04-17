import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Want to see the greates collection site in the world</p>
    <Link to="/browse"><h1>Click here to see our collection</h1></Link>
  </Layout>
)

export default IndexPage
