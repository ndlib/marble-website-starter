/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import ManifestCard from 'components/Shared/ManifestCard'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import SearchSortingSelector from 'components/Shared/SearchTools/SearchSortingSelector'
import { jsx } from 'theme-ui'

const HitDisplay = ({ hits, defaultDisplay }) => {
  const referal = { type: 'search', query: window.location.search }
  return (
    <DisplayViewToggle
      defaultDisplay={defaultDisplay}
      extraControls={SearchSortingSelector}
    >
      {
        hits ? hits.map(
          (hit, index) => (
            <ManifestCard
              iiifManifest={hit._id}
              key={index}
              referal={referal}
            >
              {
                hit.highlight ? Object.values(hit.highlight)
                  .map(
                    (row) => {
                      return row ? (
                        <div
                          key={row}
                          dangerouslySetInnerHTML={{ __html: row }}
                          sx={{
                            '& > em': {
                              backgroundColor: 'highlight',
                            },
                          }}
                        />
                      ) : null
                    },
                  ) : null
              }
            </ManifestCard>
          ),
        ) : null
      }
    </DisplayViewToggle>
  )
}

HitDisplay.propTypes = {
  hits: PropTypes.array,
  defaultDisplay: PropTypes.string,
}
HitDisplay.defaultProps = {
  defaultDisplay: 'SEARCH_PAGE',
}

export default HitDisplay

export const HitList = ({ hits }) => {
  return <HitDisplay hits={hits} defaultDisplay={'SEARCH_PAGE'} />
}
HitList.propTypes = {
  hits: PropTypes.array,
}

export const HitGrid = ({ hits }) => {
  return <HitDisplay hits={hits} defaultDisplay={'COLLECTION_PAGE'} />
}
HitGrid.propTypes = {
  hits: PropTypes.array,
}
