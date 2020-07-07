/** @jsx jsx */
import { Pagination } from 'searchkit'
import { jsx } from 'theme-ui'
import sx from './sx'

export const Pager = () => {
  return (
    <div sx={sx.wrapper}>
      <Pagination
        showNumbers
      />
    </div>
  )
}

export default Pager
