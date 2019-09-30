const checkImage = async (path) => {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve({ path, status: 'ok' })
    img.onerror = () => resolve({ path, status: 'error' })
    img.src = path
  })
}
export default checkImage
