const members = (state = [], action) => {
  switch (action.type) {
    case 'SET':
      return action.members
    case 'APPEND':
      return state.append(action.members)
    default:
      return state
  }
}

export default members
