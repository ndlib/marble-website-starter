module.exports = {
  flexWrapper: {
    display: 'flex',
    flexDirection: [2, 1, 1],
    justifyContent: 'space-evenly',
    margin: '0 auto',
    maxWidth: '1540px',
    width: 'calc(100vw - 60px)',
  },
  textWrapper: {
    flexBasis: ['100%', '20%', '20%'],
    marginBottom: '40px',
    paddingTop: '2rem',
    textAlign: [1, 0, 0],
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
    fontSize: [5, 1, 1],
    lineHeight: 'auto',
    paddingTop: '2rem',
    textAlign: [1, 0, 0],
  },
}
