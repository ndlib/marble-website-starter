import checkboxChecked from 'assets/icons/svg/check_box-24px.svg'
import checkboxEmpty from 'assets/icons/svg/check_box_outline_blank-24px.svg'

const sx = {
  wrapper: {
    '& .sk-refinement-list__view-more-action': {
      color: 'primary',
    },
    '& input[type="checkbox"]': {
      appearance: 'none',
      backgroundImage: `url(${checkboxEmpty})`,
      backgroundSize: '16px',
      backgroundRepeat: 'no-repeat',
      outline: 'none',
    },
    '& input[type="checkbox"]:checked': {
      appearance: 'none',
      backgroundImage: `url(${checkboxChecked}) !important`,
      backgroundSize: '16px',
      backgroundRepeat: 'no-repeat',
      outline: 'none',
    },
  },
}
export default sx
