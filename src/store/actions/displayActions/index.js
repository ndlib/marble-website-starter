export const COLLECTION_PAGE = 'COLLECTION_PAGE'
export const SEARCH_PAGE = 'SEARCH_PAGE'
export const DISPLAY_GRID = 'grid'
export const DISPLAY_LIST = 'list'
export const SET_PAGE_DISPLAY = 'SET_PAGE_DISPLAY'

export const setGridListView = (page, display) => {
  return {
    type: SET_PAGE_DISPLAY,
    page: page,
    display: display,
  }
}
