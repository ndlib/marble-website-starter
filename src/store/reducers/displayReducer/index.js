import {
  COLLECTION_PAGE,
  SEARCH_PAGE,
  DISPLAY_GRID,
  DISPLAY_LIST,
  SET_PAGE_DISPLAY,
} from 'store/actions/displayActions'

export const defaultState = {
  [COLLECTION_PAGE]: DISPLAY_GRID,
  [SEARCH_PAGE]: DISPLAY_LIST,
}

export default(state = defaultState, action) => {
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
