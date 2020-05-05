module.exports = {
  picture: (inCard) => {
    return inCard ? {
      border: '1px solid',
      borderColor: 'gray.2',
      display: 'block',
      height: '250px',
      position: 'relative',
      verticalAlign: 'top',
    } : {
      display: 'inline',
    }
  },
  image: (inCard) => {
    return inCard ? {
      backgroundColor: 'gray.2',
      border: '4px solid',
      borderColor: 'background',
      color: 'background',
      display: 'block',
      fontFamily: 'heading',
      fontSize: '1.5rem',
      height: '248px',
      lineHeight: '2rem',
      objectFit: 'cover',
      objectPosition: 'top',
      overflow: 'hidden',
      textAlign: 'center',
      width: '100%',
    } : {
      backgroundColor: 'gray.2',
      border: 'none',
      display: 'block',
      fontFamily: 'heading',
      fontSize: '1.5rem',
      height: 'auto',
      margin: '0 auto',
      lineHeight: '2rem',
      textAlign: 'center',
      width: '100%',
    }
  },
}
