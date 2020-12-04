/*
  Takes an array, the current index, and number of siblings to the left and to the right and returns an array of those siblings. The function will wrap the array at the ends, so for example the last item in the array will return a new array with the x items before it and the first x items at the beginning of the original array.
*/
// eslint-disable-next-line complexity
const getArrayNeighbors = (arr, index, numberBeforeAndAfter) => {
  const length = arr.length
  // If array is shorter than requested number of siblings, return original array minus the item at the current index
  if (length <= (2 * numberBeforeAndAfter) + 1) {
    return arr.filter((item, i) => {
      return i !== index
    })
  }
  const tempArr = []
  // Get the siblings to the left
  for (let i = numberBeforeAndAfter; i > 0; i--) {
    const tIndex = index - i >= 0 ? index - i : index - i + length
    tempArr.push(arr[tIndex])
  }
  // Get the sibling to the right
  for (let i = 1; i < 1 + numberBeforeAndAfter; i++) {
    const tIndex = i + index >= length ? i + index - length : i + index
    tempArr.push(arr[tIndex])
  }
  return tempArr
}
export default getArrayNeighbors
