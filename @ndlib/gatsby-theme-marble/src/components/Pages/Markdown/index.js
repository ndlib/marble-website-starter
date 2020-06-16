/** @jsx jsx */
import { BaseStyles, jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'

const Markdown = ({ data, location }) => {
  const title = typy(data, 'markdownRemark.frontmatter.title').safeString || null
  return (
    <Layout
      title={title}
      location={location}
    >
      <Seo
        data={data}
        location={location}
      />
      <BaseStyles>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </BaseStyles>
    </Layout>
  )
}

Markdown.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default Markdown
