module.exports = (value) => {
  value = value.trim()
  return value.replace(/(\[|\]|[.]$|[,]$|[/]$|[:]$|[;]$)/g, '').trim()
}
