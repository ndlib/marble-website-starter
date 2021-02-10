const baseRaw = (vertical) => {
  return {
    fontFamily: 'menu',
    verticalAlign: vertical ? 'top' : 'inherit',
  }
}
const baseFlex = {
  display: 'inline-flex',
  flexDirection: ['column', 'row', 'row'],
  flexGrow: '2',
  justifyContent: 'flex-end',
  width: ['100vw', 'auto', 'auto'],
}
const itemRaw = (vertical) => {
  return {
    display: vertical ? 'block' : 'inherit',
    textDecoration: 'none',
  }
}
const itemFlex = {
  borderTop: ['1px solid', '0', '0'],
  borderColor: 'primaryText',
  display: 'inline-flex',
  fontSize: ['20px', '18px', '18px'],
  lineHeight: '70px',
  padding: '0 16px',
}

module.exports = {
  base: (vertical, flex) => {
    return flex ? Object.assign(baseRaw(vertical), baseFlex) : baseRaw
  },
  item: (vertical, flex) => {
    return flex ? Object.assign(itemRaw(vertical), itemFlex) : itemRaw
  },
}
