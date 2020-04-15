module.exports = {
  wrapper: (spacing, max) => {
    return {
      display: 'inline-block',
      margin: `0 ${spacing}rem`,
      height: `calc(100% / ${max} - ${(max - 1) * (spacing * 2)}rem / ${max})`,
      position: 'relative',
      width: `calc(100% / ${max} - ${(max - 1) * (spacing * 2)}rem / ${max})`,
      '&:first-of-type' : {
        marginLeft: '0 !important',
      },
      '&:last-of-type' : {
        marginRight: '0 !important',
      },
    }
  },
}
