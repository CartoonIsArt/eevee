const noties = (state = [], action) => {
  switch (action.type) {
    case 'SETNOTIES':
      return action.noties
    case 'APPENDNOTIES':
      return [
        ...state,
        noties,
      ]
    default:
      return state
  }
}

export default noties
