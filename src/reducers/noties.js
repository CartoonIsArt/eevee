const noties = (state = [], action) => {
  switch (action.type) {
    case 'SETNOTIES':
      console.log(action.noties)
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
