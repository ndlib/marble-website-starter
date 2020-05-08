/** @jsx jsx */
import { BaseStyles, jsx } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Internal/Link'
import sx from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionButtonGroup/DownloadButton/DownloadModalContent/Copyright/sx'
export const Copyright = () => {
  return (
    <BaseStyles>
      <div sx={sx.wrapper}>© {new Date().getFullYear()} University of Notre Dame, unless otherwise noted. <Link to='help/copyright-and-permissions'>Copyright and permissions</Link>.</div>
    </BaseStyles>
  )
}

export default Copyright
