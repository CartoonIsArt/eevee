const init = {
  has_logged_in: false,
}
const user = (state = init, action) => {
  switch (action.type) {
    case 'SETUSER':
      return action.user
    case 'LOGIN':
      return state.append(user)
    default:
      return state
  }
}

export default user
