/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import HomeHeader from './HomeHeader'
import DefaultHeader from './DefaultHeader'

export const NavigationHeader = ({ location }) => {
  return location.pathname === '/' ? (
    <HomeHeader location={location} />
  ) : (
    <DefaultHeader location={location} />
  )
}
NavigationHeader.propTypes = {
  location: PropTypes.object.isRequired,
}
export default NavigationHeader
