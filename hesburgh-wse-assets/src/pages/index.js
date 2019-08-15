import React from 'react'
import BrandingHeader from '../components/BrandingHeader'
import ConstructionBanner from '../components/ConstructionBanner'
import Loading from '../components/Loading'
const Index = () => {
  return (
    <React.Fragment>
      <BrandingHeader />
      <ConstructionBanner
        text='Alpha Release'
        target='https://innovation.library.nd.edu/marble/'
      />
      <Loading />
    </React.Fragment>
  )
}

export default Index
