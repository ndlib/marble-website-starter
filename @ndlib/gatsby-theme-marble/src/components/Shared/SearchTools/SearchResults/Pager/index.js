/** @jsx jsx */
import { Pagination, HitsStats } from 'searchkit'
import { jsx } from 'theme-ui'
import sx from './sx'

export const Pager = () => {
  return (
    <div sx={sx.wrapper}>
      <HitsStats />
      <Pagination
        showNumbers
      />
    </div>
  )
}

export default Pager
