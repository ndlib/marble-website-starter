/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import { HitsStats, ResetFilters, SortingSelector, SearchBox } from 'searchkit'
import SearchBase from 'components/Shared/SearchBase'
import SearchResults from 'components/Shared/SearchTools/SearchResults'
import SearchRefinementListFilter from 'components/Shared/SearchTools/SearchRefinementListFilter'

const CollectionItemSearch = ({ marbleItem }) => {
  const { marbleConfiguration } = useStaticQuery(query)
  if (!marbleConfiguration.search || !marbleConfiguration.search.index || !marbleConfiguration.search.url) {
    return null
  }
  const displayContext = 'itemPage'
  return (
    <div id='related-search-section'>
      <SearchBase defaultSearch={defaultCollectionQuery(marbleItem.title, marbleConfiguration.search.index)}>
        <div sx={{
          mt: '-1rem',
          '& form': {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'gray.4',
            borderBottomWidth: '0.25rem',
            borderBottomStyle: 'solid',
            borderBottomColor: 'var(--theme-ui-colors-lightDark)',
            '& input': {
              fontSize: 6,
            },
          },
        }}>
          <SearchBox
            queryFields={['name^2', 'creator^2', 'allMetadata']}
            placeholder='Search within the collection'
            queryBuilder={customQueryBuilder}
          />
        </div>
        <div sx={{
          '&': {
            '.sk-panel__header': {
              display: 'none',
            },
            '.sk-panel': {
              border: 'none !important',
            },
            '& > div': {
              display: 'inline-block',
              margin: '0',
              verticalAlign: 'top',
              width: '50%',
            },
            '.sk-reset-filters': {
              color: 'black !important',
              float: 'right',
            },
            '.sk-item-list-option__text': {
              color: 'black !important',
            },
          },
        }}>
          <SearchRefinementListFilter
            field='hasImages'
            label='Images'
            labelOverrides={{
              true: 'Hide items without images',
              false: 'Show only items without images',
            }}
            operator='XOR'
            orderDirection='desc'
            orderKey='_term'
          />
          <ResetFilters />
        </div>
        <SearchResults
          defaultDisplay='grid'
          hitsPerPage={500}
          showPagination={true}
          scrollTo='#related-search-section'
          displayContext={displayContext}
          extraControls={(
            <div sx={{
              '& > div': {
                display: 'inline-block',
              },
              '.sk-hits-stats': {
                marginLeft: '2rem',
              },
            }}>
              <SortingSelector
                options={[
                  { label:'Relevance', field:'_score', order:'desc' },
                  { label:'Title (a-z)', field:'name.keyword', order:'asc', defaultOption:true },
                  { label:'Title (z-a)', field:'name.keyword', order:'desc' },
                  { label:'Date (newest)', field:'lowestSearchRange', order:'desc' },
                  { label:'Date (oldest)', field:'lowestSearchRange', order:'asc' },
                ]} />
              <HitsStats />
            </div>
          )}
        />
      </SearchBase>
    </div>
  )
}

CollectionItemSearch.propTypes = {
  marbleItem: PropTypes.shape({
    marbleId: PropTypes.string,
    title: PropTypes.string,
  }),
}
export default CollectionItemSearch

const defaultCollectionQuery = (id, index) => {
  return {
    bool: {
      must: {
        match: {
          'collection.keyword': {
            query: id,
          },
        },
      },
    },
  }
}

const customQueryBuilder = (query) => {
  return {
    bool : {
      should : [
        {
          match: {
            'identifier.idMatch': {
              query: query,
            },
          },
        },
        {
          multi_match: {
            query: query,
            fields: [
              'name^2',
              'creator^1.5',
              'collection^1.5',
              'allMetadata.folded',
            ],
            slop: 5,
            type: 'phrase',
            boost: 4,
          },
        },
        {
          simple_query_string: {
            query: query,
            fields: [
              'name.folded^1.4',
              'creator.folded^1',
              'collection.folded^1',
              'allMetadata.folded',
            ],
          },
        },
      ],
    },
  }
}
export const query = graphql`
query {
  marbleConfiguration {
    search {
      url
      index
    }
  }
}
`
