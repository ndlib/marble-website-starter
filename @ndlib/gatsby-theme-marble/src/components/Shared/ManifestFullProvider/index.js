import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import getLanguage from 'utils/getLanguage'

const ManifestFullProvider = ({ iiifManifest }) => {
  const lang = getLanguage()
  console.log(iiifManifest)
  if (!typy(iiifManifest, `provider`).isObject) {
    return null
  }
  const label = iiifManifest.provider.label[lang]
  return (
    <React.Fragment>
      <h3>Campus Location</h3>
      <p>{label}</p>
    </React.Fragment>

  )
}

ManifestFullProvider.propTypes = {
  iiifManifest: PropTypes.shape(
    { provider: PropTypes.object }
  ),
}

export default ManifestFullProvider
