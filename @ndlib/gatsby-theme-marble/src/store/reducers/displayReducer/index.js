import {
  COMPILATION_PAGE,
  COLLECTION_PAGE,
  COMPILATIONS_LISTING_PAGE,
  FOLLOWING_PAGE,
  SEARCH_PAGE,
  DISPLAY_GRID,
  DISPLAY_LIST,
  SET_PAGE_DISPLAY,
} from 'store/actions/displayActions'

export const defaultState = {
  [COMPILATION_PAGE]: DISPLAY_GRID,
  [COLLECTION_PAGE]: DISPLAY_GRID,
  [COMPILATIONS_LISTING_PAGE]: DISPLAY_LIST,
  [FOLLOWING_PAGE]: DISPLAY_LIST,
  [SEARCH_PAGE]: DISPLAY_LIST,
}

export default (state = defaultState, action) => {
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
