module.exports = (item) => {
  if (item && item.geographicLocations && Array.isArray(item.geographicLocations)) {
    return item.geographicLocations.map((c) => c.display)
  }

  return []
}
