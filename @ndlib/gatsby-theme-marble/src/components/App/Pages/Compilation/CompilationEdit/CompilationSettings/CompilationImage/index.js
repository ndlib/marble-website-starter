import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import ImageSelect from 'components/App/FormElements/ImageSelect'
import style from 'components/App/FormElements/style.module.css'
import defaultImage from 'assets/images/noImage.svg'

const CompilationImage = ({ compilation }) => {
  const safeItems = getSafeItems(compilation)
  return (
    <div>
      <label
        htmlFor={`compilationImage`}
        className={style.editLabel}
      >Image</label>
      <ImageSelect
        items={safeItems}
        currentImage={defaultImage}
        fieldName={`compilationImage`}
        onChange={(v) => {
          console.log(v)
        }}
      />
    </div>
  )
}

CompilationImage.propTypes = {
  compilation: PropTypes.object.isRequired,
}

export default CompilationImage

export const getSafeItems = (compilation) => {
  const items = typy(compilation, 'items').safeArray
  const safeItems = [...items]
  if (!safeItems.find(item => item.image === defaultImage)) {
    safeItems.push({
      id: `default_image`,
      image: defaultImage,
    })
  }
  return safeItems
}
