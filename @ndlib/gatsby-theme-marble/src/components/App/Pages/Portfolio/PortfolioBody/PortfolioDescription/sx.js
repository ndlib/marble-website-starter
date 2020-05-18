module.exports = {
  wrapper: {
    margin: '0 auto',
    position: 'relative',
    width: ['100%', '100%', '80%'],
  },
  buttonWrapper: (isOwner) => {
    return isOwner ? {
      display: 'inline-block',
      verticalAlign: 'top',
    } : {
      display: 'none',
    }
  },
  innerWrapper: (isOwner) => {
    return {
      border: '1px solid',
      borderColor: 'gray.0',
      display: 'inline-block',
      minWidth: isOwner ? 'calc(100% - 40px)' : '100%',
      padding: '1rem',
    }
  },
}
