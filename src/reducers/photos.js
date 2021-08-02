const photos = (state = [], action) => {
  switch (action.type) {
    case 'SETPHOTOS':
      return action.photos
    default:
      return state
  }
}

export default photos
