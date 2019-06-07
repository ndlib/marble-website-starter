import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'components/Layout'
import DisplayViewToggle, { getActiveSettings } from 'components/Shared/DisplayViewToggle'
import CollectionAside from './CollectionAside'
import CollectionPreMain from './CollectionPreMain'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Card from 'components/Shared/Card'
import {
  COLLECTION_PAGE,
  DISPLAY_GRID,
} from 'store/actions/displayActions'

export const Collection = ({ iiifManifest, location, displayReducer }) => {
  const activeSettings = getActiveSettings(displayReducer, COLLECTION_PAGE)
  const cardClass = displayReducer[COLLECTION_PAGE] || DISPLAY_GRID
  return (
    <Layout
      aside={<CollectionAside iiifManifest={iiifManifest} />}
      preMain={<CollectionPreMain iiifManifest={iiifManifest} location={location} />}
      title={iiifManifest.label}
      location={location}
    >
      <h2 className='accessibilityOnly'>Collection Items</h2>
      <DisplayViewToggle
        page={COLLECTION_PAGE}
      >
        <ResponsiveGridList
          breakpoints={activeSettings.breakpoints}
          cols={activeSettings.cols}
          rowHeight={activeSettings.rowHeight}
          cardWidth={activeSettings.cardWidth}
          measureBeforeMount
        >
          {
            iiifManifest.childrenIiifManifest.map(manifest => {
              return (
                <div key={manifest.id}>
                  <Card
                    target={`/${manifest.slug}`}
                    label={manifest.label}
                    iiifManifest={manifest}
                    location={location}
                    cardClass={cardClass}
                  >
                    <div>{manifest.description}</div>
                  </Card>
                </div>
              )
            })
          }
        </ResponsiveGridList>
      </DisplayViewToggle>
    </Layout>
  )
}

Collection.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  displayReducer: PropTypes.object,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(Collection)
