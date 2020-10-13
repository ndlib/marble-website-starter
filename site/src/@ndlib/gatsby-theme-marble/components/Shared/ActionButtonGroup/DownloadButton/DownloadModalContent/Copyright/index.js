/** @jsx jsx */
import { BaseStyles, jsx } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Internal/Link'
import sx from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionButtonGroup/DownloadButton/DownloadModalContent/Copyright/sx'
import { useTranslation } from 'react-i18next'

export const Copyright = () => {
  const { t } = useTranslation()
  return (
    <BaseStyles>
      <div sx={sx.wrapper}><Link to='help/copyright-and-permissions'>{t("text:actionGroup.copyright-link")}</Link>.</div>
    </BaseStyles>
  )
}

export default Copyright
