module.exports = {
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
  },
  wrapper: (wide) => {
    return wide ? {
      height: '250px',
      position: 'relative',
    } : {
      height: '400px',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    }
  },
  figure: {
    margin: '0',
  },
  figcaption: (wide) => {
    return wide ? {
      borderBottom: '6px solid',
      borderColor: 'primary',
      display: 'inline-block',
      height: '250px',
      marginLeft: '1.5rem',
      overflow: 'hidden',
      padding: '.5rem',
      width: 'calc(100% - 350px - 1.5rem)',
    } : {
      borderBottom: '6px solid',
      borderColor: 'primary',
      height: '150px',
      overflow: 'hidden',
      padding: '.5rem',
    }
  },
  imageStyle: (wide) => {
    return wide ? {
      wrapper: {
        border: '1px solid',
        borderColor: 'gray.2',
        display: 'inline-block',
        height: '250px',
        position: 'relative',
        verticalAlign: 'top',
        width: '350px',
      },
      image: {
        border: '4px solid',
        borderColor: 'background',
        height: '248px',
        objectFit: 'cover',
        width: '348px',
      },
    } : {
      wrapper: {
        border: '1px solid',
        borderColor: 'gray.2',
        display: 'block',
        height: '250px',
        position: 'relative',
        verticalAlign: 'top',
      },
      image: {
        border: '4px solid',
        borderColor: 'background',
        height: '248px',
        objectFit: 'cover',
        width: 'calc(100% - 2px)',
      },
    }
  },
}
