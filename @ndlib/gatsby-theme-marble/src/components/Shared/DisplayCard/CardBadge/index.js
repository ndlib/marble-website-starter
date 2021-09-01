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
import sx from '../sx.js'

const CardBadge = ({ type }) => {
  switch (type) {
    case 'link':
      return (
        <span sx={sx.cardBadge.container}>
          <IconContext.Provider value={{ color: 'white' }}>
            <MdOpenInNew sx={sx.cardBadge.icon} />
          </IconContext.Provider>
        </span>
      )
    case 'collection':
      return (
        <span sx={sx.cardBadge.container}>
          <IconContext.Provider value={{ color: 'white' }}>
            <MdCollectionsBookmark sx={sx.cardBadge.icon} />
          </IconContext.Provider>
        </span>
      )
    case 'pdf':
      return (
        <span sx={sx.cardBadge.container}>
          <IconContext.Provider value={{ color: 'white' }}>
            <MdPictureAsPdf sx={sx.cardBadge.icon} />
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
