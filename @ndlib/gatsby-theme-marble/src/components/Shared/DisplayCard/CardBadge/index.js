/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
// import { isExternal } from 'components/Shared/Link'
import { IconContext } from 'react-icons'
import {
  MdOpenInNew,
  MdCollectionsBookmark,
  MdPictureAsPdf,
} from 'react-icons/md'

const CardBadge = ({ type }) => {
  const iconSx = {
    height: '18px',
    width: '18px',
    marginTop: '9px',
  }
  const containerSx = {
    backgroundColor: 'primary',
    borderRadius: '20px',
    height: '36px',
    lineHeight: '36px',
    margin: '0',
    position: 'absolute',
    right: '0',
    textAlign: 'center',
    top: '0',
    verticalAlign: 'middle',
    width: '36px',
  }

  switch (type) {
    case 'link':
      return (
        <span sx={containerSx}>
          <IconContext.Provider value={{ color: 'white' }}>
            <MdOpenInNew sx={iconSx} />
          </IconContext.Provider>
        </span>
      )
    case 'collection':
      return (
        <span sx={containerSx}>
          <IconContext.Provider value={{ color: 'white' }}>
            <MdCollectionsBookmark sx={iconSx} />
          </IconContext.Provider>
        </span>
      )
    case 'pdf':
      return (
        <span sx={containerSx}>
          <IconContext.Provider value={{ color: 'white' }}>
            <MdPictureAsPdf sx={iconSx} />
          </IconContext.Provider>
        </span>
      )
    default:
      console.error('Unspecified CardBadge icon.')
      return null
  }
}
CardBadge.propTypes = {
  type: PropTypes.string.isRequired,
}
export default CardBadge
