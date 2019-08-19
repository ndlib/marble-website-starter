export default (location, referal) => {
  if (location && referal) {
    return {
      referal: referal,
    }
  }
  return null
}
