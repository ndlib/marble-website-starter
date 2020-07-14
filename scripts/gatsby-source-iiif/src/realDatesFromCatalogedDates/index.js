module.exports = (dates) => {
  if (!Array.isArray(dates)) {
    dates = [dates]
  }

  // remove nulls and emptys
  dates = dates.filter((d) => d)
  dates = dates.map((d) => d.toString())

  const result = {
    dates: dates,
    lowestSearchRange: 50000,
    highestSearchRange: -50000,
    circa: false,
    undated: false,
    extractedYears: [],
    centuryTags: [],
  }

  extractYearsFromDateArray(result)
  setLowestAndHighestYear(result)
  setCircaDate(result)
  setUndated(result)
  setCenturyTags(result)

  return result
}

// used to find the lowestSearchRange and highestSearchRange date values referenced in the date result
const setLowestAndHighestYear = (result) => {
  result.extractedYears.reduce((result, date) => {
    if (date < result.lowestSearchRange) {
      result.lowestSearchRange = date
    }
    if (date > result.highestSearchRange) {
      result.highestSearchRange = date
    }
    return result
  }, result)
}

// sets a boolean if the date is marked as circa
// currently unused anywhere but it could be used to add a buffer to the lower and upper search
//  dates in the result
const setCircaDate = (result) => {
  result.dates.forEach((date) => {
    if (date.match(/c|ca|c[.]|ca[.]/)) {
      result.circa = true
    }
  })
}

// adds century tags to the date data
const setCenturyTags = (result) => {
  if (result.undated) {
    result.centuryTags.push('undated')
    return
  }

  for (let i = result.lowestSearchRange; i <= result.highestSearchRange; i += 100) {
    const pre = i.toString().slice(0, -2)
    result.centuryTags.push(pre + '00-' + (pre === '20' ? 'present' : pre + '99'))
  }
  // add the end because it can be passed in the loop
  const pre = result.highestSearchRange.toString().slice(0, -2)
  result.centuryTags.push(pre + '00-' + (pre === '20' ? 'present' : pre + '99'))

  // uniq
  result.centuryTags = [...new Set(result.centuryTags)]
}

// sets the result to be undated if it is
const setUndated = (result) => {
  if (result.dates.length === 0 || result.extractedYears.length === 0) {
    result.undated = true
  }
}

// extracts all the real numbers from the string.
const extractYearsFromDateArray = (result) => {
  result.extractedYears = result.dates.map((d) => {
    d = d.toString()
    if (isDashedQuestionMarkDate(d)) {
      return extractDashedQuestionMarkDate(d)
    } else if (isOrdinalDate(d)) {
      return extractOrdinalDate(d)
    } else {
      return extractGeneralDate(d)
    }
  })

  // flatten
  result.extractedYears = result.extractedYears.reduce((result, row) => {
    return [].concat.apply(result, row)
  }, [])

  // ensure ints
  result.extractedYears = result.extractedYears.map((d) => parseInt(d, 10))
}

// dashed question marks look like this 19--? or 195-?  meaing 1900-1999 and 1950-1959
const isDashedQuestionMarkDate = (d) => {
  return d.match(/[-]{2}\?/) || d.match(/[-]\?/)
}

// replace all the dashed question marks with the range
const extractDashedQuestionMarkDate = (d) => {
  // replace -- with 00 or - with 0 and remove all non integer characters.
  return [d.replace(/[-]{2}\?/, '00').replace(/[-]\?/, '0').replace(/[^0-9]+/g, ''), d.replace(/[-]{2}\?/, '99').replace(/[-]\?/, '9').replace(/[^0-9]+/g, '')]
}

// some items come with ordinal numbers as the dates.
// this tests if these are those.
const isOrdinalDate = (d) => {
  return d.match(/[0-9]{1,2}[snrt][tdh][ ][Cc]entury/)
}

// ordinal dates come a in a couple formats we are captureing
// just the century  20th Century
// modifier mid- late early i.e mid-20th Century early 20th Century
// we are replacing the modifiers with adjustments looked up in lookUpOrdinalDateModifiers
const extractOrdinalDate = (d) => {
  const match = d.match(/(mid-|late |early )?([0-9]{1,2})/)

  const adjustment = lookUpOrdinalDateModifiers(match[1])
  const centuryStart = (match[2] - 1) + adjustment[0]
  const centuryEnd = (match[2] - 1) + adjustment[1]

  return ([centuryStart, centuryEnd])
}

// determine the modified year values to append to an oridinal date year
const lookUpOrdinalDateModifiers = (text) => {
  if (!text) {
    text = ''
  }
  text = text.toLowerCase().trim()

  if (text === 'mid-') {
    return ['33', '66']
  } else if (text === 'late') {
    return ['67', '99']
  } else if (text === 'early') {
    return ['00', '32']
  } else {
    return ['00', '99']
  }
}

// find all the years 3 and 4 digit in here.
// still a problem with 2 digit ones.
const extractGeneralDate = (d) => {
  return d.match(/([0-9]{3,4})/g)
}

// turns a century in to an ordinal value.
// 1950 -> 20th Century
// const getNumberWithOrdinal = (n) => {
//   // we want 1900 to appear as 19th century
//   if (n % 100 === 0) {
//     n += 1
//   }
//
//   n = Math.ceil(n / 100)
//   const s = ['th', 'st', 'nd', 'rd']
//   const v = n % 100
//   return n + (s[(v - 20) % 10] || s[v] || s[0])
// }
