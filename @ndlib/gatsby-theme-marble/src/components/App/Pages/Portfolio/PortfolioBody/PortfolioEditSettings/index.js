/** @jsx jsx */
import React, { useState } from 'react'
import { jsx } from 'theme-ui'
import PortfolioSettingsContent from './PortfolioSettingsContent'
import { usePortfolioContext } from 'context/PortfolioContext'
import MaterialButton from 'components/Internal/MaterialButton'
import ActionModal from 'components/Internal/ActionModal'

export const PortfolioEditSettings = () => {
  const { portfolio } = usePortfolioContext()
  const [settingsOpen, setSettingsOpen] = useState(false)
  return (
    <React.Fragment>
      <MaterialButton
        primary
        wide
        onClick={() => setSettingsOpen(true)}
      >Edit Settings</MaterialButton>
      <ActionModal
        isOpen={settingsOpen}
        contentLabel={`Settings for <i>${portfolio.title}</i>`}
        closeFunc={() => setSettingsOpen(false)}
        fullscreen
      >
        <PortfolioSettingsContent
          callBack={() => {
            setSettingsOpen(false)
          }}
        />
      </ActionModal>
    </React.Fragment>
  )
}

export default PortfolioEditSettings
