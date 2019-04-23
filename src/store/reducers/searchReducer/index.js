import {
  SUBMIT_SEARCH,
  RESULTS_READY,
  RESULTS_ERROR,
  UPDATE_INPUT,
  CLEAR_SEARCH,
  SEARCH_VIEW_CHANGE,
  STATUS_SEARCH_FETCHING,
  STATUS_SEARCH_READY,
  STATUS_SEARCH_ERROR,
  STATUS_SEARCH_EMPTY,
} from 'store/actions/searchActions'

export const defaultState = {
  status: STATUS_SEARCH_EMPTY,
  results: [],
  rawInput: '',
  terms: null,
  page: null,
  perpage: 12,
  view: 'list',
}
// eslint-disable-next-line complexity
export default(state = defaultState, action) => {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return {
        ...state,
        status: STATUS_SEARCH_FETCHING,
        page: action.page,
        perpage: action.perpage,
        rawInput: action.terms,
        terms: action.terms,
        results: [],
      }
    case RESULTS_READY:
      return {
        ...state,
        status: STATUS_SEARCH_READY,
        results: action.results,
        nextpage: action.nextpage,
      }
    case RESULTS_ERROR:
      return {
        ...state,
        status: STATUS_SEARCH_ERROR,
        results: [],
        error: action.error,
      }
    case UPDATE_INPUT:
      return {
        ...state,
        rawInput: action.rawInput,
      }
    case CLEAR_SEARCH:
      return { ...defaultState }
    case SEARCH_VIEW_CHANGE:
      return {
        ...state,
        view: action.view,
      }

    default:
      return state
  }
}
