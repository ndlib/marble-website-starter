module.exports = {
  cardStyles: {
    variant: 'card.label',
  },
  clickableWrapper: {
    color: 'gray.4',
    cursor: 'pointer',
    backgroundColor: 'background',
    border: 'none',
    display: 'block',
    
    textAlign: 'left',
    textDecoration: 'none',
    width: '100%',
    paddingRight: '16px',
    '& div.chevronWrapper': {
      display: 'none',
    },
    '&:hover': {
      textDecoration: 'none',
      '& div.chevronWrapper': {
        display: 'block',
      },
    },
    '& h2': {
      fontSize: 3,
    },
  },
  wrapper: (wide) => {
    return wide ? {
      '& em': {
        backgroundColor: 'highlight',
      },
      height: ['435px', '435px', '250px'],
      overflow: ['hidden', 'hidden', 'inherit'],
      position: 'relative',
    } : {
      '& em': {
        backgroundColor: 'highlight',
      },
      height: '435px',
      overflow: 'hidden',
      position: 'relative',
    }
  },
  imageBoarder: {
    border: '1px solid',
    borderColor: 'gray.4',
    display: 'inline-block',
    margin: '0 auto',
    padding: '4px',
    position: 'absolute',
  },
  figure: {
    margin: '0',
  },
  fadeOut: {
    height: '30px',
    backgroundImage: 'linear-gradient(#ffffff00, #ffffff66, white, white)',
    position: 'absolute',
    bottom: '0',
    width: '100%',
  },
  imageWrapper: (wide) => {
    return wide ? {
      display: ['block', 'block', 'inline-block'],
      verticalAlign: 'top',
      width: ['', '', '250px'],
    } : {
    }
  },
  imageWrapperInner: {
    boxSizing: 'border-box',
    display: 'flex',
    height: '265px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  figcaption: (wide) => {
    return wide ? {
      borderBottom: '6px solid',
      borderColor: 'primary',
      display: ['block', 'block', 'inline-block'],
      height: ['170px', '170px', '265px'],
      marginLeft: [0, 0, '1.5rem'],
      padding: '.5rem',
      overflow: 'hidden',
      position: 'relative',
      width: ['100%', '100%', 'calc(100% - 250px - 1.5rem)'],
      '& div': {
        display: ['none', 'block', 'block'],
      },
    } : {
      borderBottom: '6px solid',
      borderColor: 'primary',
      height: '170px',
      overflow: 'hidden',
      padding: '.5rem',
      position: 'relative',
      '& div': {
        display: ['none', 'block', 'block'],
      },
    }
  },
  label: {
    fontFamily: 'body',
    fontSize: 2,
    fontWeight: '100',
    lineHeight: 'heading',
    margin: '.5rem 0',
  },
  cardWrapper: {
    '.chevronWrapper': {
      display: 'none',
    },
    '&:hover': {
      '.chevronWrapper': {
        display: 'block',
      },
    },
  },
  chevron: {
    display: 'inherit',
    position: 'absolute',
    right: '-16px',
    marginTop: '5rem',
    color: 'secondary',
    fontSize: 3,
  },
}
