/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { RefinementListFilter } from 'searchkit'
import sx from './sx'

export const listOrder = (list, sort) => {
  if (sort === 'a-z') {
    list.sort((a, b) => {
      return a.key && b.key ? a.key.localeCompare(b.key, undefined, { numeric: true }) : 0
    })
  } else if (sort === 'century') {
    list.sort((a, b) => {
      if (!a.key || !b.key) {
        return 0
      } else if (a.key.startsWith('Pre-')) {
        return -1
      } else if (b.key.startsWith('Pre-')) {
        return 1
      }
      const aBC = a.key.includes('BC')
      const bBC = b.key.includes('BC')
      // -1 if first item is BC; 1 if second item is BC; else 0
      const eraDiff = bBC - aBC
      const directionOperator = (aBC ? -1 : 1) // Inverts comparison when comparing BC dates; higher numbers first
      return eraDiff || (a.key.localeCompare(b.key, undefined, { numeric: true }) * directionOperator)
    })
  }

  return list
}

export const SearchRefinementListFilter = ({ field, label, operator, defaultSearch, size, sort }) => {
  if (defaultSearchIsThisField(defaultSearch, field)) {
    return null
  }

  if (!field || !label) {
    return null
  }

  return (
    <div sx={sx.wrapper}>
      <RefinementListFilter
        field={field}
        id={label.replace(' ', '').toLowerCase()}
        title={label}
        operator={operator}
        bucketsTransform={(list) => {
          return listOrder(list, sort)
        }}
        size={parseInt(size, 10)}
        sort={sort}
      />
    </div>
  )
}
SearchRefinementListFilter.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultSearch: PropTypes.array,
  operator: PropTypes.string,
  size: PropTypes.string,
  sort: PropTypes.string,
}

SearchRefinementListFilter.defaultProps = {
  operator: 'OR',
  size: '10',
  sort: 'default',
}

const defaultSearchIsThisField = (defaultSearch, field) => {
  if (defaultSearch && defaultSearch[0]) {
    const tags = defaultSearch[0].tag.split(':')
    if (tags[0] === field) {
      return true
    }
  }

  return false
}

export default SearchRefinementListFilter
