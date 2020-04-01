/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { Styled, jsx } from 'theme-ui'
import { Link } from 'gatsby'
import HeroBox from 'components/Shared/HeroBox'
import SearchBox from 'components/Shared/SearchBox'
import CardGroup from 'components/Shared/CardGroup'
// import Card from 'components/Shared/Card'
import ManifestCard from 'components/Shared/ManifestCard'
import BlockQuote from 'components/Shared/BlockQuote'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import sx from './sx'

import banner from 'assets/images/banner.swirl.png'

const IndexPage = ({ location }) => {
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
        <h1 sx={sx.h1}>University of Notre Dame<span sx={sx.h2} >Digital Collections</span></h1>

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
        Explore digitized rare materials from the University of Notre Dame, from books to manuscripts, sculptures to paintings, photographs to ephemera.
      </BlockQuote>

      <Styled.h2>Browse By</Styled.h2>
      <MultiColumn columns='3'>
        <Column>
          <Link
            to='/search?timeperiod[0]=0-5th%20Century'
            sx={sx.browseLink}
          >
            <img
              src={dateImage}
              alt='Date'
              title=''
              sx={sx.browseImage}
            />
            <span sx={sx.browseLabel}>Date</span>
          </Link>
        </Column>
        <Column>
          <Link
            to='/search?format[0]=Paintings'
            sx={sx.browseLink}
          >
            <img
              src={formatImage}
              alt='Format'
              title=''
              sx={sx.browseImage}
            />
            <span sx={sx.browseLabel}>Format</span>
          </Link>
        </Column>
        <Column>
          <Link
            to='/search?campuslocation[0]=Rare%20Books%20and%20Special%20Collections'
            sx={sx.browseLink}
          >
            <img
              src={campuslocationImage}
              alt='Campus Location'
              title=''
              sx={sx.browseImage}
            />
            <span sx={sx.browseLabel}>Campus Location</span>
          </Link>
        </Column>
      </MultiColumn>
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default IndexPage
