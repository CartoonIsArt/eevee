const auth = (state = false, action) => {
  switch (action.type) {
    case 'SETLOGIN':
      return action.is_success
    case 'SETLOGOUT':
      return false
    default:
      return state
  }
}

export default auth
