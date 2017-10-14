const members = (state = [], action) => {
  switch (action.type) {
    case 'SETMEMBERS':
      return action.members
    case 'APPEND':
      return state.append(action.members)
    default:
      return state
  }
}

export default members
