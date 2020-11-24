import getArrayNeighbors from '../getArrayNeighbors'

describe('getArrayNeighbors', () => {
  const shortArr = [0, 1, 2]
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  test('array length shorter than requested items', () => {
    const result = getArrayNeighbors(shortArr, 1, 3)
    expect(result).toEqual([0, 2])
  })
  test('index in the middle', () => {
    const result = getArrayNeighbors(arr, 4, 3)
    expect(result).toEqual([1, 2, 3, 5, 6, 7])
  })
  test('index at beginning', () => {
    const result = getArrayNeighbors(arr, 0, 3)
    expect(result).toEqual([6, 7, 8, 1, 2, 3])
  })
  test('index at end', () => {
    const result = getArrayNeighbors(arr, 8, 3)
    expect(result).toEqual([5, 6, 7, 0, 1, 2])
  })
})
