export const UPDATE_INPUT = 'UPDATE_INPUT'

export const updateInput = (rawInput) => {
  return {
    type: UPDATE_INPUT,
    rawInput: rawInput,
  }
}
