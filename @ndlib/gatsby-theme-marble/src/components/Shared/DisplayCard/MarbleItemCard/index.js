/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import DisplayCard from 'components/Shared/DisplayCard'
import CardBadge from 'components/Shared/DisplayCard/CardBadge'
import MarbleItemCardChildren from './MarbleItemCardChildren'
import BookmarkGroup from 'components/Shared/ActionButtonGroup/BookmarkGroup'

const MarbleItemCard = (props) => {
  const {
    title,
    target,
    image,
    creator,
    collectionName,
    date,
    type,
    referalState,
  } = props
  return (
    <DisplayCard
      title={title}
      target={target}
      referalState={referalState}
      image={image}
      leftBadge={type === 'collection' ? <CardBadge type='collection' /> : null}
      rightBadge={<BookmarkGroup marbleItem={props} size='tiny' />}
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
  collectionName: PropTypes.array,
  type: PropTypes.string,
  referalState: PropTypes.node,
}

MarbleItemCard.defaultProps = {
  referalState: {},
}

export default MarbleItemCard
