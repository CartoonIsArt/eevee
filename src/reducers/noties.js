const noties = (state = [], action) => {
  switch (action.type) {
    case 'SETNOTIES':
      return action.noties
    case 'APPEND':
      return [
        ...state,
        noties,
      ]
    default:
      return state
  }
}

export default noties
