import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import Layout from 'components/Layout'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import CollectionAside from './CollectionAside'
import CollectionPreMain from './CollectionPreMain'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Card from 'components/Shared/Card'
import {
  COLLECTION_PAGE,
  DISPLAY_GRID,
  DISPLAY_LIST,
} from 'store/actions/displayActions'

export const Collection = ({ iiifManifest, location, displayReducer }) => {
  const activeSettings = getActiveSettings(displayReducer)
  const cardClass = displayReducer[COLLECTION_PAGE] || DISPLAY_GRID
  return (
    <Layout
      aside={<CollectionAside iiifManifest={iiifManifest} />}
      preMain={<CollectionPreMain iiifManifest={iiifManifest} location={location} />}
      title={iiifManifest.label}
      location={location}
    >
      <DisplayViewToggle
        page={COLLECTION_PAGE}
      >
        <ResponsiveGridList
          breakpoints={activeSettings.breakpoints}
          cols={activeSettings.cols}
          rowHeight={activeSettings.rowHeight}
          cardWidth={activeSettings.cardWidth}
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

export const getActiveSettings = (displayReducer) => {
  const gridListSettings = {
    [DISPLAY_GRID]: {
      breakpoints: { lg: 680, md: 480, sm: 240 },
      cols: { lg: 6, md: 4, sm: 2 },
      rowHeight: 200,
      cardWidth:  2,
    },
    [DISPLAY_LIST]: {
      breakpoints: { lg: 680, md: 480, sm: 240 },
      cols: { lg: 6, md: 6, sm: 6 },
      rowHeight: 250,
      cardWidth:  6,
    },
  }
  const view = typy(displayReducer, `[${COLLECTION_PAGE}]`).safeObject
  return typy(gridListSettings, `[${view}]`).safeObject || gridListSettings[DISPLAY_GRID]
}
