/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx, Heading } from 'theme-ui'
import CardShell from './CardShell'
import sx from './sx.js'

const DisplayCard = ({
  // variant,
  image,
  leftBadge,
  rightBadge,
  controls,
  title,
  target,
  children,
}) => {
  return (
    <CardShell
      target={target}
      leftBadge={leftBadge}
      rightBadge={rightBadge}
      controls={controls}
    >
      <figure sx={sx.displayCard.figure}>
        <div sx={sx.displayCard.image}>
          <img
            src={image}
            alt={title}
          />
        </div>
      </figure>
      <figcaption sx={sx.displayCard.figcaption}>
        <Heading
          as='h2'
          variant='styles.h2'
          sx={sx.displayCard.heading}
        >{title}</Heading>
        <div sx={sx.displayCard.additionalText}>{children}</div>
      </figcaption>

    </CardShell>
  )
}

DisplayCard.propTypes = {
  // variant: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  leftBadge: PropTypes.node,
  rightBadge: PropTypes.node,
  controls: PropTypes.node,
  title: PropTypes.string,
  target: PropTypes.string,
  children: PropTypes.node,
}

DisplayCard.defaultProps = {
  // variant: 'default',
  leftBadge: null,
  rightBadge: null,
}

export default DisplayCard
