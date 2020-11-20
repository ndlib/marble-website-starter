/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Card from 'components/Shared/Card'
import ManifestCardChildren from './ManifestCardChildren'
import sx from './sx'

export const ManifestCard = (props) => {
  const {
    label,
    target,
    image,
    creator,
    collectionName,
    date,
    type,
  } = props
  return (
    <div sx={sx.wrapper}>
      <Card
        label={label}
        target={target}
        image={image}
        type={type}
        {...props}
      >
        <ManifestCardChildren
          date={date}
          creator={creator}
          collectionName={collectionName}
          parentProps={props}
        />
      </Card>
    </div>
  )
}

ManifestCard.propTypes = {
  label: PropTypes.string,
  target: PropTypes.string,
  image: PropTypes.string,
  referal: PropTypes.object,
  children: PropTypes.node,
  creator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  type: PropTypes.string,

}
ManifestCard.defaultProps = {
  showCreator: true,
  showDate: true,
  showSummary: false,
}
export default ManifestCard
