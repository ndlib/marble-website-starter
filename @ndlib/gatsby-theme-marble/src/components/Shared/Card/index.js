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
  gatsbyImage,
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
                    gatsbyImage={gatsbyImage}
                    src={image || null}
                    service={imageService || null}
                    region={imageRegion || 'full'}
                    alt={label}
                  />
                </div>
              </div>
            </div>
            <ExteralLinkIcon target={target} />
            <figcaption sx={sx.figcaption(wide)}>
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
  gatsbyImage: PropTypes.object,
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
