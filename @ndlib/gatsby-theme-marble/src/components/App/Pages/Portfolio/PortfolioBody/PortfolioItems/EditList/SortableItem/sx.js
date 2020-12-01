module.exports = {
  wrapper: {
    backgroundColor: 'background',
    border: '1px solid',
    borderColor: 'gray.0',
    cursor: 'grab',
    margin: '.5rem',
    maxWidth: '60rem',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '15px 0px 0px 15px',
  },
  image: {
    height: ['60px', '80px', '100px'],
    objectFit: 'cover',
    verticalAlign: 'top',
    width: ['60px', '80px', '100px'],
  },
  dragHandle: {
    margin: '6px',
    marginTop: ['20px', '30px', '40px'],
  },
  text: {
    fontFamily: 'title',
    fontSize: '1.5rem',
    margin: '0 1rem',
    position: 'absolute',
    left: ['90px', '110px', '130px'],
  },
}
