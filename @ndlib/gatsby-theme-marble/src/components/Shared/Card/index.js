/** @jsx jsx */
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { BaseStyles, jsx, Styled } from 'theme-ui'
import CardWrapper from './CardWrapper'
import Image from 'components/Shared/Image'
import ExteralLinkIcon from './ExteralLinkIcon'
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
  isThumbnail,
}) => {
  const wide = useContext(LayoutContext) === 'list'
  const thumb = isThumbnail ? 'thumb' : null
  return (
    <CardWrapper
      target={target}
      location={location}
      referal={referal}
      onClick={onClick}
    >
      <BaseStyles>
        <article sx={sx.wrapper(wide, thumb)}>
          <figure sx={sx.figure}>
            <div sx={sx.imageWrapper(wide, thumb)}>
              <Image
                src={image || null}
                service={imageService || null}
                region={imageRegion || 'full'}
                alt={label}
                inCard={!isThumbnail}
              />
            </div>
            <ExteralLinkIcon target={target} />
            <figcaption sx={sx.figcaption(wide, thumb)}>
              <Styled.h3 dangerouslySetInnerHTML={{ __html: label }} />
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
  isThumbnail: PropTypes.bool,
}

Card.defaultProps = {
  children: null,
  cardClass: 'basicCard',
}
export default Card
