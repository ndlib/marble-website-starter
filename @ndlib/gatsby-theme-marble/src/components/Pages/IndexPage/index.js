/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Styled, jsx } from 'theme-ui'
import HeroBox from 'components/Shared/HeroBox'
import SearchBox from 'components/Shared/SearchBox'
import CardGroup from 'components/Shared/CardGroup'
import Card from 'components/Shared/Card'
import ManifestCard from 'components/Shared/ManifestCard'
import BlockQuote from 'components/Shared/BlockQuote'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import sx from './sx'

import banner from 'assets/images/banner.swirl.png'

const IndexPage = ({ location }) => {
  const { t } = useTranslation()
  const recentAdditions = [
    'https://presentation-iiif.library.nd.edu/BPP1001_EAD/manifest',
    'https://presentation-iiif.library.nd.edu/1999.024/manifest',
    'https://presentation-iiif.library.nd.edu/1992.055/manifest',
  ]
  const dateImage = 'https://image-iiif.library.nd.edu/iiif/2/2015.045.003%2F2015_045_003-v0002/full/1000,/0/default.jpg'
  const formatImage = 'https://image-iiif.library.nd.edu/iiif/2/2017.025.667%2F2017_025_667-v0015/full/1000,/0/default.jpg'
  const campuslocationImage = 'https://image-iiif.library.nd.edu/iiif/2/MSNMN5004_EAD%2FMSN-MN_5004-04.a.150/full/1000,/0/default.jpg'

  return (
    <React.Fragment>
      <HeroBox backgroundImage={banner}>
        <h1 sx={sx.h1}>{t('text:index.nd')}<span sx={sx.h2}>{t('text:index.title')}</span></h1>
        <SearchBox location={location} />
      </HeroBox>
      <CardGroup
        label='Recent Additions'
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

      <BlockQuote>
        {t('text:index.blockQuote')}
      </BlockQuote>

      <Styled.h2>Browse By</Styled.h2>
      <MultiColumn columns='3'>
        <Column>
          <Card
            label='Date'
            target='/browse?scrollto=date'
            image={dateImage}
          />
        </Column>
        <Column>
          <Card
            label='Format'
            target='/browse?scrollto=format'
            image={formatImage}
          />
        </Column>
        <Column>
          <Card
            label='Campus Location'
            target='/browse?scrollto=location'
            image={campuslocationImage}
          />
        </Column>
      </MultiColumn>
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default IndexPage
