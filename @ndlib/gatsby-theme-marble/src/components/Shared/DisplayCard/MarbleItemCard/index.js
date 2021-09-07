/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import DisplayCard from 'components/Shared/DisplayCard'
import CardBadge from 'components/Shared/DisplayCard/CardBadge'
import MarbleItemCardChildren from './MarbleItemCardChildren'

const MarbleItemCard = (props) => {
  const {
    title,
    target,
    image,
    creator,
    collectionName,
    date,
    type,
  } = props
  console.log("collection name", collectionName)
  return (
    <DisplayCard
      title={title}
      target={target}
      image={image}
      leftBadge={type === 'collection' ? <CardBadge type='collection' /> : null}
    >
      <MarbleItemCardChildren
        date={date}
        creator={creator}
        collectionName={collectionName}
        parentProps={props}
      />
    </DisplayCard>
  )
}

MarbleItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  image: PropTypes.string,
  creator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  collectionName: PropTypes.string,
  type: PropTypes.string,
}

MarbleItemCard.defaultProps = {

}

export default MarbleItemCard
