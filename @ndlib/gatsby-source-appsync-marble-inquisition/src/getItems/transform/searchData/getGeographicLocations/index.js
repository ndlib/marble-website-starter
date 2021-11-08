module.exports = (item) => {
  if (item && item.geographicLocations && Array.isArray(item.geographicLocations)) {
    return item.geographicLocations.map((c) => {
      const display = c.display.split(',')
      // capture the aleph case could also use a test from item.
      if (display.length === 2) {
        console.log(`${display[1]} (${display[0]})`)
        return `${display[1]} (${display[0]})`
      }

      return c.display
    })
  }

  return []
}
