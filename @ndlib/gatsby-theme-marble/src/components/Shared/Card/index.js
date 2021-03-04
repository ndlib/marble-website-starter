/** @jsx jsx */
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { BaseStyles, jsx } from 'theme-ui'
import CardWrapper from './CardWrapper'
import Image from 'components/Shared/Image'
import ExternalLinkIcon from './ExternalLinkIcon'
import TypeLabel from './TypeLabel'
import { LayoutContext } from 'components/Internal/DisplayViewToggle'
import sx from './sx'

const Card = ({
  target,
  label,
  image,
  type,
  children,
  location,
  referal,
  imageService,
  imageRegion,
  onClick,
  showAsList,
  variant,
}) => {
  let wide = useContext(LayoutContext) === 'list'
  if (showAsList) {
    wide = true
  }

  return (
    <CardWrapper
      target={target}
      location={location}
      referal={referal}
      onClick={onClick}
    >
      <BaseStyles>
        <div sx={{ variant: variant }}>
          <article sx={sx.wrapper(wide)}>
            <figure sx={sx.figure}>
              <div sx={sx.imageWrapper(wide)}>
                <div sx={sx.imageWrapperInner}>
                  <div sx={sx.imageBoarder}>
                    <TypeLabel type={type} />
                    <Image
                      src={image || null}
                      service={imageService || null}
                      region={imageRegion || 'full'}
                      alt={label}
                    />
                    <ExternalLinkIcon target={target} />
                  </div>
                </div>
              </div>
              <figcaption sx={sx.figcaption(wide)}>
                <h2 sx={sx.label} dangerouslySetInnerHTML={{ __html: label }} />
                <div>
                  {children}
                </div>
                <div className='fade' sx={sx.fadeOut} />
              </figcaption>
            </figure>
          </article>
        </div>
      </BaseStyles>
    </CardWrapper>
  )
}

Card.propTypes = {
  target: PropTypes.string,
  label: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string,
  imageService: PropTypes.string,
  imageRegion: PropTypes.string,
  children: PropTypes.node,
  location: PropTypes.object,
  referal: PropTypes.object,
  onClick: PropTypes.func,
  showAsList: PropTypes.bool,
  variant: PropTypes.string,
}

Card.defaultProps = {
  children: null,
  cardClass: 'basicCard',
  showAsList: false,
  variant: 'card.primary',
}
export default Card
