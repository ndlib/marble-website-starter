import React from 'react'
import PropTypes from 'prop-types'
import {
  DataSearch,
  ReactiveList,
} from '@appbaseio/reactivesearch'
import Card from 'components/Shared/Card'
import CardGroup from 'components/Shared/CardGroup'
import Loading from 'components/Internal/Loading'

const SavedSearch = ({ terms, location }) => {
  const safeTerms = terms.replace(' ', '')
  const components = [`SavedSensor${safeTerms}`, `SavedSearchResults${safeTerms}`]
  return (
    <React.Fragment>
      <div style={{ display: 'none' }}>
        <DataSearch
          componentId={components[0]}
          dataField={['title', 'creator', 'fulltext', 'type', 'systemId']}
          defaultValue={terms}
          highlight={false}
          react={{ 'and': components }}
          URLParams={false}
        />
      </div>
      <ReactiveList
        componentId={components[1]}
        dataField={'title'}
        react={{
          'and': components,
        }}
        excludeFields={['fulltext']}
        size={48}
        loader={<Loading />}
        infiniteScroll={false}
        pagination={false}
        showResultStats={false}
        renderNoResults={() => {
          return null
        }}
        render={({ data, error, loading }) => {
          if (!error && !loading && data) {
            return (
              <CardGroup
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
                      >
                        <div className='description'>{res.description}</div>
                        <div>{res.creator}</div>
                      </Card>
                    </div>
                  )
                  )
                }
              </CardGroup>
            )
          }
          return null
        }}
      />
    </React.Fragment>
  )
}

SavedSearch.propTypes = {
  location: PropTypes.object.isRequired,
  terms: PropTypes.string,
}

SavedSearch.defaultProps = {
  terms: '',
}
export default SavedSearch
