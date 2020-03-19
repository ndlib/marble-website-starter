/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import HeroBox from 'components/Shared/HeroBox'
import SearchBox from 'components/Shared/SearchBox'
import CardGroup from 'components/Shared/CardGroup'
import Card from 'components/Shared/Card'
import ManifestCard from 'components/Shared/ManifestCard'
import BlockQuote from 'components/Shared/BlockQuote'
import sx from './sx'

import banner from 'assets/images/banner.swirl.png'
import timeImage from 'assets/images/06.jpg'
import themeImage from 'assets/images/04.jpg'

const IndexPage = ({ location }) => {
  const recentAdditions = [
    'https://presentation-iiif.library.nd.edu/BPP1001_EAD/manifest',
    'https://presentation-iiif.library.nd.edu/1999.024/manifest',
    'https://presentation-iiif.library.nd.edu/1992.055/manifest',
  ]

  return (
    <React.Fragment>
      <HeroBox backgroundImage={banner}>
        <h1 sx={sx.h1}>University of Notre Dame<span sx={sx.h2} >Digital Collections</span></h1>

        <SearchBox location={location} />
        <div
          sx={sx.tagLine}
        >Explore our digitized artwork, rare books, artifacts, and archival materials.</div>
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
        Explore digitized rare materials from the University of Notre Dame, from books to manuscripts, sculptures to paintings, photographs to ephemera.
      </BlockQuote>

      <CardGroup
        label='Browse By'
      >
        <Card
          label={'Time'}
          image={timeImage}
          target='/search?timeperiod[0]=0-5th%20Century'
        />
        <Card
          label={'Theme'}
          image={themeImage}
          target='/search?theme[0]=Historical%20Artifacts'
        />
      </CardGroup>
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default IndexPage
