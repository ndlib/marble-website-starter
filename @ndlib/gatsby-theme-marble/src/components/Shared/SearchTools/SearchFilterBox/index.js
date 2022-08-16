/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  SearchBox,
  SelectedFilters,
} from 'searchkit'
import { useTranslation } from 'react-i18next'
import sx from './sx'

const SearchFilterBox = () => {
  const { t } = useTranslation()
  const fieldLabel = t('common:search.prompt')
  const fields = ['name^2', 'creator^2', 'allMetadata']

  return (
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
        queryFields={fields}
        placeholder={fieldLabel}
        queryBuilder={customQueryBuilder}
      />
      <div sx={sx.wrapper}>
        <div sx={sx.filters}>
          <SelectedFilters />
        </div>
      </div>
    </div>
  )
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
            analyze_wildcard: true,
            default_operator :'AND',
            fields: [
              'name.folded^1.4',
              'creator.folded^1',
              'collection.folded^1',
              'allMetadata.folded',
              'identifier.no_punctuation_keyword^1.5',
            ],
          },
        },
      ],
    },
  }
}

export default SearchFilterBox
