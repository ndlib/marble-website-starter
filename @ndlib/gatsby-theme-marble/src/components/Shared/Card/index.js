/** @jsx jsx */
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { BaseStyles, jsx, Card } from 'theme-ui'
import CardWrapper from './CardWrapper'
import Image from 'components/Shared/Image'
import ExternalLinkIcon from './ExternalLinkIcon'
import TypeLabel from './TypeLabel'
import { LayoutContext } from 'components/Shared/CardGroup'
import sx from './sx'

const MarbleCard = ({
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
  variant,
  imageTag,
}) => {
  const wide = useContext(LayoutContext) === 'list'
  let DisplayImage = (<Image
    src={image || null}
    service={imageService || null}
    region={imageRegion || 'full'}
    alt={label}
  />)
  if (imageTag) {
    DisplayImage = imageTag
  }
  return (
    <CardWrapper
      target={target}
      location={location}
      referal={referal}
      onClick={onClick}
    >
      <Card>
        <div sx={{ variant: variant }}>
          <article sx={sx.wrapper(wide)}>
            <figure sx={sx.figure}>
              <div sx={sx.imageWrapper(wide)}>
                <div sx={sx.imageWrapperInner}>
                  <div sx={sx.imageBoarder}>
                    <TypeLabel type={type} />
                    {DisplayImage}
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
      </Card>
    </CardWrapper>
  )
}

MarbleCard.propTypes = {
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
  variant: PropTypes.string,
}

MarbleCard.defaultProps = {
  children: null,
  cardClass: 'basicCard',
  showAsList: false,
  variant: 'card.primary',
}
export default MarbleCard
