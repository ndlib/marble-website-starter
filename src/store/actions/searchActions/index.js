import fetchJson from 'utils/fetchJSON'
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'
export const RESULTS_READY = 'RESULTS_READY'
export const RESULTS_ERROR = 'RESULTS_ERROR'
export const UPDATE_INPUT = 'UPDATE_INPUT'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const PAGE_CHANGE = 'PAGE_CHANGE'
export const SEARCH_VIEW_CHANGE = 'SEARCH_VIEW_CHANGE'
export const STATUS_SEARCH_FETCHING = 'STATUS_SEARCH_FETCHING'
export const STATUS_SEARCH_READY = 'STATUS_SEARCH_READY'
export const STATUS_SEARCH_ERROR = 'STATUS_SEARCH_ERROR'
export const STATUS_SEARCH_EMPTY = 'STATUS_SEARCH_EMPTY'

export const searchCriteria = '?vid=MAR&tab=marble&scope=snite&view=full'

export const submitSearch = (searchBase, perpage, terms, page) => {
  return dispatch => {
    page = page || 1
    perpage = perpage || 12
    dispatch(startSearch(String(terms), parseInt(page, 10), parseInt(perpage, 10)))
    const url = buildSearchUrl(searchBase, perpage, terms, page)

    return fetchJson(url)
      .then(json => {
        let nextpage = false
        if (json.docs && json.docs.length > perpage) {
          nextpage = true
          json.docs.splice(-1, 1)
        } else {
          nextpage = false
        }
        dispatch(returnResults(json, nextpage))
      })
      .catch(e => dispatch(returnError(e)))
  }
}

export const buildSearchUrl = (searchBase, perpage, terms, page) => {
  const offset = `&offset=${String(parseInt(perpage, 10) * parseInt(page - 1, 10))}`
  const searchterm = `&q=any,contains,${String(terms)}`
  const limit = `&limit=${String(parseInt(perpage, 10) + 1)}`
  return encodeURI(`${searchBase}${searchCriteria}${searchterm}${limit}${offset}`)
}

export const startSearch = (terms, page, perpage) => {
  return {
    type: SUBMIT_SEARCH,
    terms: terms,
    page : page,
    perpage: perpage,
  }
}

export const returnResults = (results, nextpage) => {
  return {
    type: RESULTS_READY,
    results: results,
    nextpage: nextpage,
  }
}

export const returnError = (error) => {
  return {
    type: RESULTS_ERROR,
    error: error,
  }
}

export const updateInput = (rawInput) => {
  return {
    type: UPDATE_INPUT,
    rawInput: rawInput,
  }
}
export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH,
    terms: '',
    results: [],
    page : 1,
    view : 'list',
  }
}

export const viewChange = (view) => {
  return {
    type: SEARCH_VIEW_CHANGE,
    view: view,
  }
}
