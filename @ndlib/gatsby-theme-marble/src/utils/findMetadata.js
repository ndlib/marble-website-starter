import typy from 'typy'
export default (item, options) => {
  if (!item.metadata) {
    return []
  }

  return item.metadata.reduce((metaValue, row) => {
    const label = typy(row, 'label').safeString.toLowerCase()

    if (options.includes(label)) {
      return metaValue.concat(row.value.join('<br/>'))
    }

    return metaValue
  }, [])
}
