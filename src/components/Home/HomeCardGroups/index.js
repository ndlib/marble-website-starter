import React from 'react'
import PropTypes from 'prop-types'
import HomeCardGroup from './HomeCardGroup'

const HomeCardGroups = ({ groups }) => {
  return (
    <React.Fragment>
      {
        groups.map((group, index) => {
          return (
            <HomeCardGroup
              label={group.label}
              items={group.items}
              key={index}
            />
          )
        })
      }
    </React.Fragment>
  )
}

HomeCardGroups.propTypes = {
  groups: PropTypes.array.isRequired,
}

export default HomeCardGroups
