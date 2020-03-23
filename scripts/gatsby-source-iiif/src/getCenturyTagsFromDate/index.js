
module.exports = (dates) => {
  if (!dates) {
    return ['undated']
  }
  console.log(dates)
  if (Array.isArray(dates)) {
    console.log(dates)
    dates = dates[0]
  }
  dates = dates.toString()
  console.log(dates)
  const mappedDates = dates.match(/([0-9]{4})/g)
  if (!mappedDates) {
    console.error('date not mapped', dates)
    return ['undated']
  }

  let years = dates.match(/([0-9]{4})/g).map((year) => {
    year = Math.ceil(year / 100)
    return getNumberWithOrdinal(year) + ' Century'
  })
  if (years.length === 0) {
    years = ['undated']
  }

  return years
}

const getNumberWithOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
