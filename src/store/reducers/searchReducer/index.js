import {
  UPDATE_INPUT,
} from 'store/actions/searchActions'

export const defaultState = {
  rawInput: '',
}
// eslint-disable-next-line complexity
export default(state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_INPUT:
      return {
        ...state,
        rawInput: action.rawInput,
      }
    default:
      return state
  }
}
