/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import { useTranslation } from 'react-i18next'
import { jsx } from 'theme-ui'

const MetaDataAidValue = ({ values, styles }) => {
  const { t } = useTranslation()

  return (
    <>
      {
        values.map(val => {
          return (
            <div key={'div-' + val}>
              <dd sx={styles} key={val}>
                <Link to={val} target='_blank' rel='noopener noreferrer' >
                  {val}
                </Link>
              </dd>
              <dd key={'aid-text'} sx={styles}>
                {t('text:aidContext')}
              </dd>
            </div>

          )
        })
      }
    </>
  )
}

MetaDataAidValue.propTypes = {
  values: PropTypes.array,
  styles: PropTypes.object,
}

export default MetaDataAidValue
