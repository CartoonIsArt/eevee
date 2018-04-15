const members = (state = [], action) => {
  switch (action.type) {
    case 'SETMEMBERS':
      return action.members
    case 'APPEND':
      return [
        ...state,
        action.members,
      ]
    default:
      return state
  }
}

export default members
