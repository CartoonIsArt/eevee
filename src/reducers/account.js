const account = (state = {}, action) => {
  switch (action.type) {
    case 'SETACCOUNT':
      return Object.assign({}, action.account)
    case 'UPDATEACCOUNT':
      return action.account
    default:
      return state
  }
}

export default account
