import { mergeObject } from "../lib"

const members = (state = [], action) => {
  switch (action.type) {
    case 'SETMEMBERS':
      return action.members
    case 'UPDATEMEMBERS':
      return state.map(member => {
        if (action.members.actives.includes(member.id))
          member.isActive = true
        if (action.members.inactives.includes(member.id))
          member.isActive = false
        return member
      })
    case 'UPDATEACCOUNT':
      return state.map(member => {
        if (member.id === action.account.id)
          return mergeObject(member, action.account)
        return member
      })
    default:
      return state
  }
}

export default members
