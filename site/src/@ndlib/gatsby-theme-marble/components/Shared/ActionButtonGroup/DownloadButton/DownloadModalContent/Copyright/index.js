/** @jsx jsx */
import { BaseStyles, jsx } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Internal/Link'
import sx from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionButtonGroup/DownloadButton/DownloadModalContent/Copyright/sx'
import { useTranslation } from 'react-i18next'
export const Copyright = () => {
  const { t } = useTranslation()
  return (
    <BaseStyles>
      <div sx={sx.wrapper}>© {new Date().getFullYear()}{t("text:actionGroup.copyright")}<Link to='help/copyright-and-permissions'>Copyright and permissions</Link>.</div>
    </BaseStyles>
  )
}

export default Copyright
