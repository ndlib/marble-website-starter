import React, { useState } from 'react'
import PropTypes from 'prop-types'
import HorizontalSubmenu from './HorizontalSubmenu'
import EditItems from './EditItems'
import CompilationSettings from './CompilationSettings'
import EditControls from './EditControls'
import style from 'components/App/FormElements/style.module.css'
import localStyle from './style.module.css'
const CompilationEdit = ({ compilation, loginReducer }) => {
  const [showItems, toggleShow] = useState(true)
  const viewOptions = [
    {
      label: 'Items',
      func: () => toggleShow(true),
      isActive: showItems,
    },
    {
      label: 'Settings',
      func: () => toggleShow(false),
      isActive: !showItems,
    },
  ]
  return (
    <div className={localStyle.wrapper}>
      <HorizontalSubmenu options={viewOptions} />
      <EditControls compilation={compilation} />
      <div className={showItems ? localStyle.showItems : localStyle.showSettings}>
        <EditItems
          compilation={compilation}
          className={localStyle.items}
          loginReducer={loginReducer}
        />
        <form className={style.edit}>
          <CompilationSettings
            compilation={compilation}
            className={localStyle.settings}
            loginReducer={loginReducer}
          />

        </form>
      </div>
    </div>
  )
}

CompilationEdit.propTypes = {
  compilation: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default CompilationEdit
