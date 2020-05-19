/** @jsx jsx */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Styled, jsx } from 'theme-ui'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'
import { usePortfolioContext } from 'context/PortfolioContext'
import SaveOrCancelButtons from 'components/App/Pages/Portfolio/PortfolioBody/SaveOrCancelButtons'
import sx from './sx'

const PortfolioSettingsContent = ({ callBack }) => {
  const { portfolio } = usePortfolioContext()
  const [layout, changeLayout] = useState(portfolio.layout)
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  const [patching, setPatching] = useState(false)

  return (
    <React.Fragment>
      <div sx={sx.buttonWrapper}>
        <SaveOrCancelButtons
          closeFunc={callBack}
          patching={patching}
          setPatching={setPatching}
          body={{
            privacy: privacy || 'private',
            layout: layout || 'default',
          }}
          valid
          changed={layout !== portfolio.layout || privacy !== portfolio.privacy}
        />
      </div>
      <MultiColumn columns='2'>
        <Column>
          <label>
            <Styled.h2>Layout</Styled.h2>
            <LayoutSettings
              portfolio={portfolio}
              onChange={changeLayout}
            />
          </label>
          <label>
            <h2>Privacy</h2>
            <VisibilitySettings
              portfolio={portfolio}
              onChange={changePrivacy}
            />
          </label>
        </Column>
        <Column>
          <label>
            <h2>Danger Zone</h2>
            <DangerDelete portfolio={portfolio} />
          </label>
        </Column>
      </MultiColumn>

    </React.Fragment>
  )
}

PortfolioSettingsContent.propTypes = {
  callBack: PropTypes.func.isRequired,
}

export default PortfolioSettingsContent
