module.exports = (item) => {
  // snite repositories
  if (['museum', 'snite'].includes(item.repository.toLowerCase())) {
    return 'Snite Museum of Art'
  }

  if (['unda'].includes(item.repository.toLowerCase())) {
    return 'University Archives'
  }

  if (['hesb'].includes(item.repository.toLowerCase())) {
    return 'General Collection, Hesburgh Libraries'
  }

  if (['archt'].includes(item.repository.toLowerCase())) {
    return 'Architecture Library, Hesburgh Libraries'
  }


  return 'Rare Books & Special Collections'
}
