import React, { useState } from 'react'
import PropTypes from 'prop-types'
import HorizontalSubmenu from 'components/Internal/HorizontalSubmenu'
import EditItems from './EditItems'
import PortfolioSettings from './PortfolioSettings'
import EditControls from './EditControls'
import style from 'components/App/FormElements/style.module.css'
import localStyle from './style.module.css'
const PortfolioEdit = ({ portfolio, loginReducer }) => {
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
      <EditControls portfolio={portfolio} />
      <div className={showItems ? localStyle.showItems : localStyle.showSettings}>
        <EditItems
          portfolio={portfolio}
          className={localStyle.items}
          loginReducer={loginReducer}
        />
        <form className={style.edit}>
          <PortfolioSettings
            portfolio={portfolio}
            className={localStyle.settings}
            loginReducer={loginReducer}
          />
        </form>
      </div>
    </div>
  )
}

PortfolioEdit.propTypes = {
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default PortfolioEdit
