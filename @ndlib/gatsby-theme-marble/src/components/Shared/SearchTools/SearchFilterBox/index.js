/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import { useTranslation } from 'react-i18next'
import HeroBox from 'components/Shared/HeroBox'
import sx from './sx'

const SearchFilterBox = () => {
  const { t } = useTranslation()
  const fieldLabel = t('common:search.prompt')
  const fields = ['name', 'creator', 'allMetadata']

  return (
    <HeroBox>
      <SearchBox
        queryFields={fields}
        placeholder={fieldLabel}
      />
      <div sx={sx.wrapper}>
        <div sx={sx.filters}>
          <SelectedFilters />
        </div>
        <div sx={sx.reset}>
          <ResetFilters />
        </div>
      </div>
    </HeroBox>
  )
}

export default SearchFilterBox
