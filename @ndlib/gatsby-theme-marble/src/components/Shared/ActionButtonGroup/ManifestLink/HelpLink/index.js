/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useTranslation } from 'react-i18next'
import typy from 'typy'
import { jsx, BaseStyles } from 'theme-ui'

const HelpLink = () => {
  const { t } = useTranslation()
  return (
    <sup>
      <BaseStyles>
        <a
          sx={{
            display: 'inline-block',
            float: 'right',
            margin: '0',
            padding: '10px 4px 10px 20px',
            textDecoration: 'none',
          }}
          href={t('common:iiifHelpURL')}
        >What is IIIF?
        </a>
      </BaseStyles>
    </sup>

  )
}

export default HelpLink
