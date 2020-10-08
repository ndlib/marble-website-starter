/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Card from 'components/Shared/Card'
import TypeLabel from './TypeLabel'
import ManifestCardChildren from './ManifestCardChildren'
import sx from './sx'

export const ManifestCard = (props) => {
  const {
    label,
    target,
    image,
    creator,
    date,
    type,
  } = props
  return (
    <div sx={sx.wrapper}>
      <Card
        label={label}
        target={target}
        image={image}
        {...props}
      >
        <ManifestCardChildren
          date={date}
          creator={creator}
          parentProps={props}
        />
      </Card>
      <TypeLabel type={type} />
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
  date: PropTypes.string,
  type: PropTypes.string,

}
ManifestCard.defaultProps = {
  showCreator: true,
  showDate: true,
  showSummary: false,
}
export default ManifestCard
