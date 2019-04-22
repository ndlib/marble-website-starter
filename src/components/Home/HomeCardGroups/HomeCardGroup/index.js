import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Shared/Card'

const HomeCardGroup = ({ label, items }) => {
  return (
    <div className='featured'>
      <h2>{label}</h2>
      <div className='grid-x grid-margin-x'>
        {
          items.map((item, index) => {
            return (
              <Card
                key={JSON.stringify(item)}
                target={item.target}
                label={item.label}
                image={item.image}
              />
            )
          })
        }
      </div>
    </div>
  )
}

HomeCardGroup.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default HomeCardGroup
