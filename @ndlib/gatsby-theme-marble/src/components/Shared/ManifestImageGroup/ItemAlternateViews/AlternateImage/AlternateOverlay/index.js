/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const AlternateOverlay = ({ isLast, overlayNumber }) => {
  // index starts at 1, since we are already showing the first image above this
  // only render on last instance
  // do not render if total shown equals total available
  if (isLast) {
    return (
      <div
        className='alternateOverlay'
        title='See all images.'
        sx={{
          backgroundColor: 'rgba( 0, 0, 0, .75)',
          color: 'white',
          fontSize: '18px',
          height: '100%',
          position: 'absolute',
          textAlign: 'center',
          width: '100%',
        }}
        >
        <span
          sx={{
            left: '0',
            position: 'absolute',
            top: 'calc(50% - 9px)',
            width: '100%',
          }}
        >{`+${overlayNumber}`}</span>
      </div>
    )
  }
  return null
}
AlternateOverlay.propTypes = {
  isLast: PropTypes.bool.isRequired,
  overlayNumber: PropTypes.number.isRequired,
}
export default AlternateOverlay
