/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx, Card as ThemeCard } from 'theme-ui'
import LinkOrWrapper from './LinkOrWrapper'

const CardShell = ({
  leftBadge,
  rightBadge,
  controls,
  target,
  children,
}) => {
  const badgeSx = {
    position: 'absolute',
    top: '20px',
    height: '36px',
    width: '36px',
  }
  return (
    <ThemeCard className='card' sx={{
      minHeight: '350px',
      '& button': {
        margin: '0.25rem',
        marginTop: '0.5rem',
      },
      '& button:first-of-type': {
        marginLeft: '0',
      },
    }}>
      <LinkOrWrapper target={target}>
        {children}
        <div
          className='leftBadge'
          sx={{
            ...badgeSx,
            left: '-0.5rem',
          }}
        >{leftBadge}</div>
        <div
          className='rightBadge'
          sx={{
            ...badgeSx,
            right: '-0.5rem',
          }}
        >{rightBadge}</div>
      </LinkOrWrapper>
      { controls || null }
    </ThemeCard>
  )
}

CardShell.propTypes = {
  // variant: PropTypes.string.isRequired,
  leftBadge: PropTypes.node,
  rightBadge: PropTypes.node,
  controls: PropTypes.node,
  target: PropTypes.string,
  children: PropTypes.node,
}

CardShell.defaultProps = {
  // variant: 'default',
  leftBadge: null,
  rightBadge: null,
}

export default CardShell
