module.exports = {
  flexWrapper: {
    display: 'flex',
    flexDirection: [0, 1, 1],
    justifyContent: 'space-evenly',
    margin: '0 auto 2rem',
    maxWidth: '1540px',
    width: 'calc(100vw - 60px)',
  },
  textWrapper: {
    flexBasis: ['100%', '20%', '20%'],
    marginBottom: '40px',
    paddingTop: '2rem',
    textAlign: [1, 0, 0],
    display: 'inline-block',
  },
  imageWrapper: {
    flexBasis: ['100%', '35%', '35%'],
    textAlign: 1,
  },
  image: {
    margin: '40px 40px 0 !important',
    maxWidth: 'calc(100% - 80px)',
  },
  menuWrapper: {
    flexBasis: ['100%', '10%', '10%'],
    fontSize: [4, 1, 1],
    lineHeight: 'auto',
    paddingTop: '2rem',
    textAlign: 1,
  },
  footerContacts: {
    display: ['block', 'inline', 'inline'],
  },
  footerLeftColumn: {
    textAlign: 1,
    display: 'block',
    flexBasis: ['100%', '35%', '35%'],
    img : {
      minWidth: '200px',
    },
    left: ['auto', '0', '0'],
  },
  footerRightColumn: {
    textAlign: 1,
    right: ['auto', '0', '0'],
    align: 'right',
  }
}
