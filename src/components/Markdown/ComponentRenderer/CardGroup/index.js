import React from 'react'
import PropTypes from 'prop-types'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import style from './style.module.css'

const CardGroup = ({ label, children }) => {
  return (
    <div className={style.cardGroup}>
      <h2>{label}</h2>
      <ResponsiveGridList measureBeforeMount>
        {
          children.map((card, index) => {
            return (
              <div
                key={index}
                className={style.cardWrapper}
              >
                {card}
              </div>
            )
          })
        }
      </ResponsiveGridList>
    </div>
  )
}

CardGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.array.isRequired,
}

export default CardGroup
