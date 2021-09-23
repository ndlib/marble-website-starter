/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import gravatar from 'gravatar'
import NoUserImage from 'assets/images/noUser.svg'
export const Gravatar = ({ email, size }) => {
  if (!email) {
    return (
      <img
        src={NoUserImage}
        alt={`User unavailable`}
        className='gravatar'
        sx={sx}
      />
    )
  }
  const src = gravatarImg(email, size)
  return (
    <img
      src={src}
      alt={`Globally Recognized Avatar for ${email}`}
      className='gravatar'
      sx={sx}
    />
  )
}

Gravatar.propTypes = {
  email: PropTypes.string,
  size: PropTypes.number,
}
export default Gravatar

export const gravatarImg = (email, size = 400) => {
  return gravatar.url(
    email,
    {
      s: size,
      r: 'pg',
      default: 'mp', // https://en.gravatar.com/site/implement/images/
    },
    'https'
  )
}

const sx = {
  border: '1px solid #dedede',
}
