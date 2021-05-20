/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import { useTranslation } from 'react-i18next'
import sx from './sx'

const SearchFilterBox = () => {
  const { t } = useTranslation()
  const fieldLabel = t('common:search.prompt')
  const fields = ['name^2', 'creator^2', 'allMetadata']

  return (
    <div sx={{
      '& form': {
        border: '1px black solid',
        borderRadius: '10px',
      },
    }}>
      <SearchBox
        queryFields={fields}
        placeholder={fieldLabel}
        queryBuilder={customQueryBuilder}
      />
      <div sx={sx.wrapper}>
        <div sx={sx.filters}>
          <SelectedFilters />
        </div>
        <div sx={sx.reset}>
          <ResetFilters />
        </div>
      </div>
    </div>
  )
}

const customQueryBuilder = (query, options) => {
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

export default SearchFilterBox
