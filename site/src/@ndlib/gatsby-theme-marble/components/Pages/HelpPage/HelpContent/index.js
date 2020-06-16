/** @jsx jsx */
import { jsx, BaseStyles } from 'theme-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Menu from 'components/Shared/Menu'

const HelpContent = ({ location }) => {
  const { t } = useTranslation()
  const page = getPageName(location)
  return (
    <Layout
      title={t(`text:helpPage.${page}.title`)}
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      <BaseStyles>
        <MultiColumn columns='5'>
          <Column>
            <Menu navClass='verticalMenu' menu='help' />
          </Column>
          <Column colSpan='4'>
            <div dangerouslySetInnerHTML={{ __html: t(`text:helpPage.${page}.text`) }} />
          </Column>
        </MultiColumn>
      </BaseStyles>
    </Layout>
  )
}

HelpContent.propTypes = {
  location: PropTypes.object.isRequired,
}
export default HelpContent

export const getPageName = (location) => {
  let pathname = location.pathname
  if (pathname[0] === '/') {
    pathname = pathname.slice(1)
  }
  if (pathname.startsWith('help/')) {
    pathname = pathname
      .replace('help/', '')
      .toLowerCase()
      .replace(/-(.)/g, (match, group1) => {
        return group1.toUpperCase()
      })
  } else {
    pathname = 'index'
  }
  return pathname
}
