const init = {
  has_logged_in: false,
}
const account = (state = init, action) => {
  switch (action.type) {
    case 'SETACCOUNT':
      return Object.assign({}, action.account, { has_logged_in: true })
    case 'LOGIN':
      return [
        ...state,
        account,
      ]
    case 'UPDATEACCOUNT':
      return action.account
    case 'LOGOUT':
      return init
    default:
      return state
  }
}

export default account
