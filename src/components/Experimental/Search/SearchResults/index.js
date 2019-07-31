import React from 'react'
import PropTypes from 'prop-types'
import { ReactiveList } from '@appbaseio/reactivesearch'
import Card from 'components/Shared/Card'
import DisplayViewToggle, { getActiveSettings } from 'components/Internal/DisplayViewToggle'
import Loading from 'components/Internal/Loading'
import {
  SEARCH_PAGE,
  DISPLAY_LIST,
} from 'store/actions/displayActions'

const SearchResults = ({ location, components, displayReducer }) => {
  const activeSettings = getActiveSettings(displayReducer, SEARCH_PAGE)
  const cardClass = displayReducer[SEARCH_PAGE] || DISPLAY_LIST

  return (
    <ReactiveList
      componentId='SearchResult'
      dataField={'title'}
      react={{
        'and': components,
      }}
      excludeFields={['fulltext']}
      size={48}
      loader={<Loading />}
      scrollOnChange
      infiniteScroll={false}
      pagination
      renderNoResults={() => (<div>No matches could be found</div>)}
      render={({ data, error, loading }) => {
        if (!error && !loading && data) {
          return (
            <DisplayViewToggle
              page={SEARCH_PAGE}
              activeSettings={activeSettings}
            >
              {
                data.map(res => (
                  <div key={res['_id']}>
                    <Card
                      label={res.title}
                      image={res.thumbnail}
                      target={res.url}
                      location={location}
                      referal={{ type: 'search', query: location.search }}
                      cardClass={cardClass}
                    >
                      <div className='description'>{res.description}</div>
                      <div>{res.creator}</div>
                    </Card>
                  </div>
                )
                )
              }
            </DisplayViewToggle>
          )
        }
        return null
      }}
    />
  )
}

SearchResults.propTypes = {

  location: PropTypes.object.isRequired,
  components: PropTypes.array.isRequired,
  displayReducer: PropTypes.object.isRequired,
}

export default SearchResults
