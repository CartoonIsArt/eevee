const members = (state = [], action) => {
  switch (action.type) {
    case 'SETMEMBERS':
      return action.members
    case 'UPDATEMEMBERS':
      console.log(action.members)
      return state.map(member => {
        if (action.members.actives.includes(member.id))
          member.isActive = true
        if (action.members.inactives.includes(member.id))
          member.isActive = false
        return member
      })
    default:
      return state
  }
}

export default members
