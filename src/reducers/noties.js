const notifications = (state = [], action) => {
  switch (action.type) {
    case 'SET':
      return action.notifications
    case 'APPEND':
      return state.append(notifications)
    default:
      return state
  }
}

export default notifications
