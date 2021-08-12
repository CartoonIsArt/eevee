const auth = (state = false, action) => {
  switch (action.type) {
    case 'SETLOGIN':
      return true
    case 'SETLOGOUT':
      return false
    default:
      return state
  }
}

export default auth
