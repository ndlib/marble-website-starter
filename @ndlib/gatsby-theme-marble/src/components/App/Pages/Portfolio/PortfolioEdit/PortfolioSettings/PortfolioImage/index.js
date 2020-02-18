import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import ImageSelect from 'components/App/FormElements/ImageSelect'
import style from 'components/App/FormElements/style.module.css'
import defaultImage from 'assets/images/noImage.svg'

const PortfolioImage = ({ portfolio }) => {
  const safeItems = getSafeItems(portfolio)
  return (
    <div>
      <label
        htmlFor={`portfolioImage`}
        className={style.editLabel}
      >Image</label>
      <ImageSelect
        items={safeItems}
        currentImage={defaultImage}
        fieldName={`portfolioImage`}
        onChange={(v) => {
          console.log(v)
        }}
      />
    </div>
  )
}

PortfolioImage.propTypes = {
  portfolio: PropTypes.object.isRequired,
}

export default PortfolioImage

export const getSafeItems = (portfolio) => {
  const items = typy(portfolio, 'items').safeArray
  const safeItems = [...items]
  if (!safeItems.find(item => item.image === defaultImage)) {
    safeItems.push({
      id: `default_image`,
      image: defaultImage,
    })
  }
  return safeItems
}
