const sun = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLESUN':
      return !state
    case 'SETSUN':
      return action.sun
    default:
      return state
  }
}

export default sun
