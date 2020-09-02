/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { Styled, jsx } from 'theme-ui'
import CardGroup from 'components/Shared/CardGroup'
import BrowseBar from 'components/Shared/BrowseBar'
import ManifestCard from 'components/Shared/ManifestCard'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import { useTranslation } from 'react-i18next'

const IndexPage = ({ location }) => {
  const { t } = useTranslation()
  const recentAdditions = [
    'https://presentation-iiif.library.nd.edu/005096943/manifest',
    'https://presentation-iiif.library.nd.edu/1951.004.015/manifest',
    'https://presentation-iiif.library.nd.edu/002097132/manifest',
    'https://presentation-iiif.library.nd.edu/2008.039.002/manifest',
    'https://presentation-iiif.library.nd.edu/MSNEa8006_EAD/manifest',
    'https://presentation-iiif.library.nd.edu/002203292/manifest',
    'https://presentation-iiif.library.nd.edu/2014.047.003/manifest',
    'https://presentation-iiif.library.nd.edu/MSNCW5066_EAD/aspace_af1b13d5efb947f3d936118a8a9e2b12/manifest',
    'https://presentation-iiif.library.nd.edu/1999.031.002/manifest',
  ]
  const dateImage = 'https://image-iiif.library.nd.edu/iiif/2/2015.045.003%2F2015_045_003-v0002/full/1000,/0/default.jpg'
  const formatImage = 'https://image-iiif.library.nd.edu/iiif/2/2017.025.667%2F2017_025_667-v0015/full/1000,/0/default.jpg'
  const campuslocationImage = 'https://image-iiif.library.nd.edu/iiif/2/MSNMN5004_EAD%2FMSN-MN_5004-04.a.150/full/1000,/0/default.jpg'
  const allImage = 'https://image-iiif.library.nd.edu/iiif/2/1976.057%2F1976_057-v0001/full/full/0/default.jpg'

  return (
    <React.Fragment>
      <Styled.h2>{t('common:search.browseBy')}</Styled.h2>
      <MultiColumn columns='4'>
        <Column>
          <BrowseBar
            label='Date'
            target='/browse?scrollto=date'
            image={dateImage}
          />
        </Column>
        <Column>
          <BrowseBar
            label='Format'
            target='/browse?scrollto=format'
            image={formatImage}
          />
        </Column>
        <Column>
          <BrowseBar
            label='Campus Location'
            target='/browse?scrollto=location'
            image={campuslocationImage}
          />
        </Column>
        <Column>
          <BrowseBar
            label='All Items'
            target='/search?q='
            image={allImage}
          />
        </Column>
      </MultiColumn>
      <CardGroup
        label={t('common:search.recentAdditions')}
      >
        {
          recentAdditions.map(manifest => {
            return (
              <ManifestCard
                key={manifest}
                iiifManifest={manifest}
              />
            )
          })

        }
      </CardGroup>
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default IndexPage
