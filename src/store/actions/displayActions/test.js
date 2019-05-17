import {
  COLLECTION_PAGE,
  DISPLAY_GRID,
  SET_PAGE_DISPLAY,
  setGridListView,
} from './'

test('setGridListView', () => {
  expect(setGridListView(COLLECTION_PAGE, DISPLAY_GRID)).toEqual({ type: SET_PAGE_DISPLAY, page: COLLECTION_PAGE, display: DISPLAY_GRID })
})
