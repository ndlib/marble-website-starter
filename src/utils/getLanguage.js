import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  try {
    const { site } = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              languages {
                default
              }
            }
          }
        }
      `
    )
    return site.siteMetadata.languages.default
  } catch (e) {
    console.error('NO DEFAULT LANGUAGE SET.')
    console.error(e)
  }
  return `none`
}
