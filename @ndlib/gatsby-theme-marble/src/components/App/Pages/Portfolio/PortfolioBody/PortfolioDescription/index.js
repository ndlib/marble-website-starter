/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import CalloutBox from 'components/Shared/CalloutBox'

const PortfolioDescription = ({ portfolio, isOwner }) => {
  return (
    <div>
      <CalloutBox>
        <p>{portfolio.description}</p>
      </CalloutBox>
    </div>
  )
}

PortfolioDescription.propTypes = {
  portfolio: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
}
export default PortfolioDescription
