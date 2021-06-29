module.exports = {
  mainMetadata: {
    '& > dl > div': {
      backgroundColor: 'transparent !important',
      borderBottom: '1px solid',
      borderColor: 'gray.3',
      position: 'relative',
    },
    '& > dl > div:first-of-type': {
      borderTop: '1px solid',
      borderColor: 'gray.3',
    },
    '& dt': {
      position: 'absolute',
      verticalAlign: 'top',
      width: ['120px', '200px', '200px'],
    },
    '& dd': {
      display: 'inline-block',
      marginLeft: ['120px', '200px', '200px'],
      verticalAlign: 'top',
      width: ['calc(100% - 120px)', 'calc(100% - 200px)', 'calc(100% - 200px)'],
    },
  },
  sideMetadata: {
    backgroundColor: 'lightLight',
    border: '1px solid',
    borderLeft: '3px solid',
    borderColor: 'gray.3',
    marginTop: '-1rem',
    '& > dl > div': {
      backgroundColor: 'transparent !important',
      position: 'relative',
    },
    '& dt': {
      position: 'absolute',
      verticalAlign: 'top',
      width: ['120px', '200px', '200px'],
    },
    '& dd': {
      display: 'inline-block',
      marginLeft: ['120px', '200px', '200px'],
      verticalAlign: 'top',
      width: ['calc(100% - 120px)', 'calc(100% - 200px)', 'calc(100% - 200px)'],
    },
  },
  contactMetadata: {
    width: 'calc(100% - .5rem)',
    '& > dl > div': {
      padding: '1.5rem',
      paddingTop: '0',
    },
    '& dd': {
      padding: '.5rem',
    },
  },
  hr: {
    borderTop: '2px solid',
    borderColor: '#337684',
    marginBottom: ['2rem', '3rem', '3rem'],
    marginTop: ['2rem', '3rem', '3rem'],
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}
