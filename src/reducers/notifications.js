const notifications = (state = [], action) => {
  switch (action.type) {
    case 'SETNOTIFICATIONS':
      return action.notifications
    case 'APPENDNOTIFICATIONS':
      return [
        ...state,
        action.notifications,
      ]
    default:
      return state
  }
}

export default notifications
