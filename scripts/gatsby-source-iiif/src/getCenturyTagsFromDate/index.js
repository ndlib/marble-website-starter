
module.exports = (dates) => {
  if (!dates) {
    return ['undated']
  }
  // ensure it is an array
  if (!Array.isArray(dates)) {
    dates = [dates]
  }
  dates = dates.map((d) => {
    d = d.toString()
    d = fixLibraryDates(d)
    // find all the years 3 and 4 digit in here.
    // still a problem with 2 digit ones.
    d = d.match(/([0-9]{3,4})/g)
    return d
  }).filter((d) => d)

  let tags = dates.map((d) => {
    return d.map((year) => {
      year = parseInt(year, 10)
      // if it is 1900 it needs to say 20th centiury so add 1 for calculation
      if (year % 100 === 0) {
        year += 1
      }
      year = Math.ceil(year / 100)
      return getNumberWithOrdinal(year) + ' Century'
    })
  })
  // if we don't have tags put it in undated
  if (tags.length === 0) {
    tags = ['undated']
  }
  tags = tags.reduce((acc, val) => acc.concat(val), [])

  // uniq
  return [...new Set(tags)]
}

const getNumberWithOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

const fixLibraryDates = (d) => {
  return d.replace(/[-]{2}\?/, '00').replace(/[-]\?/, '0')
}
