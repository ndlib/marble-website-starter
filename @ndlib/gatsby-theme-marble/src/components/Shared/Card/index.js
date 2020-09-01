/** @jsx jsx */
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { BaseStyles, jsx } from 'theme-ui'
import CardWrapper from './CardWrapper'
import Image from 'components/Shared/Image'
import ExternalLinkIcon from './ExternalLinkIcon'
import { LayoutContext } from 'components/Internal/DisplayViewToggle'
import sx from './sx'

const Card = ({
  target,
  label,
  image,
  children,
  location,
  referal,
  imageService,
  imageRegion,
  onClick,
}) => {
  const wide = useContext(LayoutContext) === 'list'
  return (
    <CardWrapper
      target={target}
      location={location}
      referal={referal}
      onClick={onClick}
    >
      <BaseStyles>
        <article sx={sx.wrapper(wide)}>
          <figure sx={sx.figure}>
            <div sx={sx.imageWrapper(wide)}>
              <div sx={sx.imageWrapperInner}>
                <div sx={sx.imageBoarder}>
                  <Image
                    src={image || null}
                    service={imageService || null}
                    region={imageRegion || 'full'}
                    alt={label}
                  />
                </div>
              </div>
            </div>
            <ExternalLinkIcon target={target} />
            <figcaption sx={sx.figcaption(wide)}>
              <h2 sx={sx.label} dangerouslySetInnerHTML={{ __html: label }} />
              <div>
                {children}
              </div>
              <div className='fade' sx={sx.fadeOut} />
            </figcaption>
          </figure>
        </article>
      </BaseStyles>
    </CardWrapper>
  )
}

Card.propTypes = {
  target: PropTypes.string,
  label: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageService: PropTypes.string,
  imageRegion: PropTypes.string,
  children: PropTypes.node,
  location: PropTypes.object,
  referal: PropTypes.object,
  onClick: PropTypes.func,
}

Card.defaultProps = {
  children: null,
  cardClass: 'basicCard',
}
export default Card
