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
    outline: 'none',
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
    }
  },
  wrapper: (wide) => {
    return wide ? {
      '& em': {
        backgroundColor: 'highlight',
      },
      height: '250px',
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
      display: 'inline-block',
      verticalAlign: 'top',
      width: '250px',
    } : {}
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
      display: 'inline-block',
      height: '265px',
      marginLeft: '1.5rem',
      overflow: 'hidden',
      padding: '.5rem',
      position: 'relative',
      width: 'calc(100% - 250px - 1.5rem)',
    } : {
      borderBottom: '6px solid',
      borderColor: 'primary',
      height: '170px',
      overflow: 'hidden',
      padding: '.5rem',
      position: 'relative',
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
