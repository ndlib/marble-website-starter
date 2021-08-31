/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx, Heading } from 'theme-ui'
import CardShell from './CardShell'

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
      <figure
        className='cardImage'
        sx={{
          margin: '0 auto',
          border: '1px solid',
          borderColor: 'gray.2',
        }}>
        <div
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray.1',
            maxWidth: '100%',
            height: '300px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <img
            src={image}
            alt={title}
            sx={{
              display: 'block',
              objectFit: 'contain',
              width: '100%',
              height: '300px',
            }}
          />
        </div>
      </figure>
      <figcaption sx={{
        padding: '0 0.5rem',
      }}>
        <Heading
          as='h2'
          variant='styles.h2'
          sx={{
            marginTop: '0.5rem',
            maxHeight: 'calc(1.25rem * 1.2 * 3)', // fontSize * lineHeight * numOfLines
            overflowY: 'hidden',
          }}
        >{title}</Heading>
        <div className='cardText'>
          {children}
        </div>
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
