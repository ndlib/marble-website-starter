/** @jsx jsx */
import { jsx } from 'theme-ui'
import HomeHeader from './HomeHeader'
import DefaultHeader from './DefaultHeader'

export const NavigationHeader = ({ location }) => {
  return location.pathname === '/' ? (
    <HomeHeader location={location} />
  ) : (
    <DefaultHeader location={location} />
  )
}
export default NavigationHeader
