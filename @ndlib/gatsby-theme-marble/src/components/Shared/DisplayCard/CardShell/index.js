/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx, Card as ThemeCard } from 'theme-ui'
import LinkOrWrapper from './LinkOrWrapper'
import sx from '../sx.js'

const CardShell = ({
  leftBadge,
  rightBadge,
  controls,
  target,
  children,
  referalState,
}) => {
  return (
    <ThemeCard className='card' sx={sx.cardShell.themeCard}>
      <LinkOrWrapper target={target} referalState={referalState}>
        {children}
        <div sx={sx.cardShell.leftBadge}>{leftBadge}</div>
        <div sx={sx.cardShell.rightBadge}>{rightBadge}</div>
      </LinkOrWrapper>
      { controls || null }
    </ThemeCard>
  )
}

CardShell.propTypes = {
  leftBadge: PropTypes.node,
  rightBadge: PropTypes.node,
  controls: PropTypes.node,
  target: PropTypes.string,
  children: PropTypes.node,
  referalState: PropTypes.object,
}

CardShell.defaultProps = {
  leftBadge: null,
  rightBadge: null,
}

export default CardShell
