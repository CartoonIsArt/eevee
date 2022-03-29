const registrations = (state = [], action) => {
  switch (action.type) {
    case 'SETREGISTRATIONS':
      return action.members
    default:
      return state
  }
}
  
export default registrations
  