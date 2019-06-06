import React from 'react'
import PropTypes from 'prop-types'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Card from 'components/Shared/Card'
import style from './style.module.css'

const HomeCardGroup = ({ label, items }) => {
  return (
    <div className={style.featured}>
      <h2>{label}</h2>
      <ResponsiveGridList measureBeforeMount>
        {
          items.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  target={item.target}
                  label={item.label}
                  image={item.image}
                />
              </div>
            )
          })
        }
      </ResponsiveGridList>
    </div>
  )
}

HomeCardGroup.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default HomeCardGroup
