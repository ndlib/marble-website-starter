const getFileType = require('./')

describe('getFileType', () => {
  test('unknown', () => {
    const id = 'nope'
    const result = getFileType(id)
    expect(result).toEqual('unknown')
  })
  test('image', () => {
    const id = 'file.png'
    const result = getFileType(id)
    expect(result).toEqual('image')
  })
  test('pdf', () => {
    const id = 'file.pdf'
    const result = getFileType(id)
    expect(result).toEqual('pdf')
  })
  test('audio', () => {
    const id = 'file.ogg'
    const result = getFileType(id)
    expect(result).toEqual('audio')
  })
  test('video', () => {
    const id = 'file.mov'
    const result = getFileType(id)
    expect(result).toEqual('video')
  })
  test('data', () => {
    const id = 'file.json'
    const result = getFileType(id)
    expect(result).toEqual('data')
  })
})
