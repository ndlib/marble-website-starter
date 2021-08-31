/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'

const LinkOrWrapper = ({ target, children }) => {
  const linkSx = {
    display: 'block',
    position: 'relative',
  }
  return target
    ? (
      <Link
        to={target}
        sx={{
          ...linkSx,
          color: 'unset',
          textDecoration: 'none',
          paddingBottom: '1.5rem',
          transitionDuration: '.3s',
          '&:hover': {
            textDecoration: 'none',
            backgroundColor: 'light',
            transform: 'scale(1.025)',
            paddingBottom: '1.25rem',
            borderBottom: '0.25rem solid',
            borderColor: 'lightDark',
          },
        }}
      >{children}</Link>
    )
    : (
      <div sx={linkSx}>{children}</div>
    )
}

LinkOrWrapper.propTypes = {
  target: PropTypes.string,
  children: PropTypes.node,
}

export default LinkOrWrapper
