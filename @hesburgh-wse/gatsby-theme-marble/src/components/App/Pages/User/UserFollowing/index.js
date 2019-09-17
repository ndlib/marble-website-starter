import React from 'react'
import PropTypes from 'prop-types'
import UserLayout from '../UserLayout'
import UserTopMenu from '../UserLayout/UserTopMenu'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import Card from 'components/Shared/Card'
import { gravatarImg } from 'components/Internal/Gravatar'
import { FOLLOWING_PAGE } from 'store/actions/displayActions'
const UserFollowing = (props) => {
  return (
    <UserLayout {...props}>
      <UserTopMenu username={props.username} />
      <DisplayViewToggle defaultDisplay={FOLLOWING_PAGE}>
        <Card
          key={0}
          target='/user/dwolfe2'
          label='Dan Wolfe'
          image={gravatarImg('dwolfe2@nd.edu')}
        >dwolfe2</Card>
        <Card
          key={1}
          target='/user/jhartzle'
          label='Jon Hartzler'
          image={gravatarImg('jhartzle@nd.edu')}
        >jhartzle</Card>
      </DisplayViewToggle>
    </UserLayout>
  )
}
UserFollowing.propTypes = {
  username: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserFollowing
