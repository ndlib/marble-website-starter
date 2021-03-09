import {
  SET_PAGE_DISPLAY,
} from 'store/actions/displayActions'

export const defaultState = {
}

export default (state = defaultState, action) => {
  console.log(action)
  switch (action.type) {
    case SET_PAGE_DISPLAY:
      return {
        ...state,
        [action.page]: action.display,
      }
    default:
      return state
  }
}
