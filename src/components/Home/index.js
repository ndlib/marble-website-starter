import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Shared/Seo'
import HomeBanner from './HomeBanner'
import HomeCardGroups from './HomeCardGroups'
import image1 from 'assets/images/01.jpg'
import image2 from 'assets/images/02.jpg'
import image3 from 'assets/images/03.jpg'
import image4 from 'assets/images/04.jpg'
import image5 from 'assets/images/05.jpg'
import image6 from 'assets/images/06.jpg'

const groups = [
  {
    label: 'Featured',
    items: [
      { image: image1, label: 'In a Civilized Nation: Newspapers, Magazines and the Print Revolution in the 19th-Century Peru', target: 'https://collections.library.nd.edu/3df879828f/in-a-civilized-nation' },
      { image: image2, label: 'Highlights', target: '/browse/notre-dame' },
      { image: image3, label: 'Recently Added', target: '/browse' },
    ],
  },
  {
    label: 'Browse by',
    items: [
      { image: image6, label: 'Time', target: '/browse/timeperiods' },
      { image: image5, label: 'Place', target: '/browse/places' },
      { image: image4, label: 'Theme', target: '/browse/themes' },
    ],
  },
]
const Home = ({ title, location }) => {
  return (
    <Layout
      location={location}
      preMain={
        <React.Fragment>
          <Seo title={title} />
          <HomeBanner location={location} />
        </React.Fragment>
      }
    >
      <HomeCardGroups groups={groups} />
    </Layout>
  )
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}
export default Home
