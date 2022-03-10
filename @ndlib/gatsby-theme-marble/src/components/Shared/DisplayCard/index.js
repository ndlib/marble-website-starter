/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx, Heading } from 'theme-ui'
import CardShell from './CardShell'
import CardImage from './CardImage'
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
  referalState,
}) => {
  return (
    <CardShell
      target={target}
      leftBadge={leftBadge}
      rightBadge={rightBadge}
      controls={controls}
      referalState={referalState}
    >
      <figure sx={sx.displayCard.figure}>
        <CardImage image={image} alt={title} />
      </figure>
      <figcaption sx={sx.displayCard.figcaption}>
        <Heading
          as='h2'
          variant='styles.h2'
          sx={sx.displayCard.heading}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div sx={sx.displayCard.additionalText}>{children}</div>
      </figcaption>

    </CardShell>
  )
}

DisplayCard.propTypes = {
  image: PropTypes.string,
  leftBadge: PropTypes.node,
  rightBadge: PropTypes.node,
  controls: PropTypes.node,
  title: PropTypes.string,
  target: PropTypes.string,
  children: PropTypes.node,
  referalState: PropTypes.node,
}

DisplayCard.defaultProps = {
  // variant: 'default',
  leftBadge: null,
  rightBadge: null,
  referalState: {},
}

export default DisplayCard
