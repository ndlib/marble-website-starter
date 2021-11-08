module.exports = (item) => {
  if (item && item.geographicLocations && Array.isArray(item.geographicLocations)) {
    return item.geographicLocations.map((c) => {
      if (!c.display.match(/[(].+[,].+[)]/)) {
        const display = c.display.split(',')
        // capture the aleph case could also use a test from item.
        if (display.length === 2) {
          return `${display[1].trim()} (${display[0].trim()})`
        }
      }

      return c.display.trim()
    })
  }

  return []
}
