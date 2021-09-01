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
}) => {
  return (
    <ThemeCard sx={sx.cardShell.themeCard}>
      <LinkOrWrapper target={target}>
        {children}
        <div sx={sx.cardShell.leftBadge}>{leftBadge}</div>
        <div sx={sx.cardShell.rightBadge}>{rightBadge}</div>
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
